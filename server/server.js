'use strict';

require('dotenv').config();
const fs = require('fs');
const request = require('request');
const cheerio = require('cheerio');
const host = process.env.PORT ? '0.0.0.0' : '127.0.0.1'; //ask Joe about this
const port = process.env.PORT || 8080;
const cors_proxy = require('cors-anywhere');
const firebase = require('firebase');
const firebaseURL = process.env.FB_DATABASE_URL;
const FBconfig = {
		apiKey: process.env.FB_API_KEY,
		authDomain: process.env.FB_AUTH_DOMAIN
	};

firebase.initializeApp(FBconfig);

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
      // fs.writeFile(__dirname + '/html/scrapedFeed.xml', responseHtml, (err) => {
      //     if (err) console.log("error in write file", err);
      //     console.log('entire-page.html successfully written to HTML folder');
      // });
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
    // let lastFBUpdate = //TODO - grab last update for this source, check before adding story
    // go through each item tag in xml/rss feed, and set properties for that story
    $("item").toArray().forEach( (article, index) => {
    	let $article = $(article);
    	let storyObject = {};
      storyObject.date = $article.find('pubDate').text();
      // if(storyObject.date > lastFBUpdate) {
	      storyObject.source = source_id;
	      storyObject.headline = $article.find("title").text();
	      storyObject.link = $article.find("guid").text();
	      storyObject.copy = $article.find("description").text();
	      storyObject.imageURL = $article.find('media\\:content').attr('url');
	      storyObject.byline = $article.find('dc\\:creator').text();
	      storyObject.keywords = [];
	      $article.find('category').toArray().forEach( (keyword) => {
	      	storyObject.keywords.push( $(keyword).text() );
		    pushStoryToFB(storyObject);
	      });
	      // storyCollection.push(storyObject); //TODO change to write to FB
      // }  //for date check
    });
    //TODO change to write to FB
    resolve(resHtml);
  });
}

function pushStoryToFB(storyObject) {
	return new Promise( (resolve, reject) => {
		let stringyStory = JSON.stringify(storyObject);
		request.post( `${firebaseURL}/articles.json` ).form( stringyStory );
		resolve(stringyStory);
	})
}

// function checkSourceUpdate(source_id) {
// 	return new Promise( (resolve, reject) => {
	// TODO
// 	});
// }

//scrape the page
scrapePage()
.then( (resHtml) => {
	console.log('ITEMS SENT TO FIREBASE');
  return parseItems(resHtml);
})
.catch( (err) => {
  console.log("error", err );
});
