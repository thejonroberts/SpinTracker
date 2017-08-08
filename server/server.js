'use strict';

require('dotenv').config();
const fs = require('fs');
const request = require('request');
const cheerio = require('cheerio');
const host = process.env.PORT ? '0.0.0.0' : '127.0.0.1'; //ask Joe about this
const port = process.env.PORT || 8080;
const cors_proxy = require('cors-anywhere');
const Storage = require('node-storage');
const store = new Storage(__dirname + "/data/scrapedData.js");
const pageURL = 'https://www.nytimes.com/';

cors_proxy.createServer({ //TODO ask Joe about this
  originWhitelist: [], // Allow all origins
  removeHeaders: ['cookie', 'cookie2']
}).listen(port, host, function() {
  console.log('Running CORS Anywhere on ' + host + ':' + port);
});

function scrapePage() {
  return new Promise( (resolve, reject) => {
    //make an HTTP request for the page to be scraped
    request(`http://localhost:${port}/${pageURL}`, (error, response, responseHtml) => {
      if (error) { console.log("error", error); reject(); };
      //write the entire scraped page to the local file system
      fs.writeFile(__dirname + '/html/scrapedPage.html', responseHtml, (err) => {
          if (err) console.log("error in write file", err);
          console.log('entire-page.html successfully written to HTML folder');
          resolve(responseHtml);
      });
    });
  });
}

function parseItems(resHtml) {
  return new Promise( (resolve, reject) => {
    const $ = cheerio.load(resHtml),
          storyCollection = $('article.story');
    storyCollection.toArray().forEach( (article) => {
      let	source = pageURL,
          id = $(article).attr('id'),
          headline = $(article).find('.story-heading').text(),
          link = $(article).find('.story-heading a').attr('href'),
          byline = $(article).find('.byline').text(),
          copy = $(article).find('.summary').text();
          if(!copy) {
          	copy = $(article).find('.summary').next().text();
          }
      if ( id && copy && headline && link) {
      	//TODO - change to store in FB
				store.put(id, {headline, link, byline, copy});
	      }
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
