'use strict';

require('dotenv').config();
const fs = require('fs');
const request = require('request');
const cheerio = require('cheerio');
const host = process.env.PORT ? '0.0.0.0' : '127.0.0.1'; //ask Joe about this
const port = process.env.PORT || 8080;
const cors_proxy = require('cors-anywhere');

cors_proxy.createServer({ //TODO ask Joe about this
  originWhitelist: [], // Allow all origins
  removeHeaders: ['cookie', 'cookie2']
}).listen(port, host, function() {
  console.log('Running CORS Anywhere on ' + host + ':' + port);
});

//this will change per news source
const pageURL = 'http://www.nytimes.com/services/xml/rss/nyt/HomePage.xml';

function scrapePage() {
  return new Promise( (resolve, reject) => {
    //make an HTTP request for the page to be scraped
    request(`http://localhost:${port}/${pageURL}`, (error, response, responseHtml) => {
      if (error) { console.log("error", error); reject(); };
      //write the entire scraped page to the local file system
      fs.writeFile(__dirname + '/html/scrapedFeed.xml', responseHtml, (err) => {
          if (err) console.log("error in write file", err);
          console.log('entire-page.html successfully written to HTML folder');
      });
          resolve(responseHtml);
    });
  });
}

function parseItems(resHtml) {
  return new Promise( (resolve, reject) => {
    const $ = cheerio.load(resHtml, {
					    	normalizeWhitespace: true,
					    	xmlMode: true});
    let source_id = "001"; //id for NYT
    let storyCollection = [];
    // go through each item tag in xml/rss feed, and set properties for that story
    $("item").toArray().forEach( (article, index) => {
    	let $article = $(article);
    	let storyObject = {};
      storyObject.source = source_id;
      storyObject.headline = $article.find("title").text();
      storyObject.link = $article.find("guid").text();
      storyObject.copy = $article.find("description").text();
      storyObject.imageURL = $article.find('media\\:content').attr('url');
      storyObject.byline = $article.find('dc\\:creator').text();
      storyObject.date = $article.find('pubDate').text();
      storyObject.keywords = [];
      $article.find('category').toArray().forEach( (keyword) => {
      	storyObject.keywords.push( $(keyword).text() );
      });
      storyCollection.push(storyObject); //TODO change to write to FB
    });
    //TODO change to write to FB
    let storyString = JSON.stringify(storyCollection);
    fs.writeFile(__dirname + '/data/scrapedFeed.json', storyString, (err) => {
        if (err) console.log("error in write file", err);
        console.log('story collection successfully written to data folder');
			// store.put(`${index}`, storyObject);
    });
    resolve(resHtml);
  });
}

//scrape the page
scrapePage()
.then( (resHtml) => {
	console.log('html written to folder');
  return parseItems(resHtml);
})
.catch( (err) => {
  console.log("error", err );
});
