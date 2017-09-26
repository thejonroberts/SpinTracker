'use strict';

require('dotenv').config();
const fs = require('fs');
const request = require('request');
const cheerio = require('cheerio');
var moment = require('moment');

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

cors_proxy
	.createServer({
		originWhitelist: [], // Allow all origins
		removeHeaders: ['cookie', 'cookie2']
	})
	.listen(port, host, function() {
		console.log('Running CORS Anywhere on ' + host + ':' + port);
	});

//this must be reassigned to scrape per source in sources.js file
// const source  = require('./sources.js').Breitbart;
// const source  = require('./sources.js').NewYorkTimes;
// const source  = require('./sources.js').NationalReview;
// const source  = require('./sources.js').MSNBC;
// const source  = require('./sources.js').NationalPublicRadio;

function scrapePage(feedURL) {
	return new Promise((resolve, reject) => {
		//make an HTTP request for the page to be scraped
		request(`http://localhost:${port}/${feedURL}`, (error, response, responseXml) => {
			if (error) {
				console.log('error', error);
				reject();
			}
			//write the entire scraped page to the local file system
			fs.writeFile(__dirname + `/data/${source.filename}.xml`, responseXml, err => {
				if (err) {
					console.log('error in write file', err);
				} else {
					console.log(`entire feed successfully written to data/${source.filename}`);
				}
			});
			resolve(responseXml);
		});
	});
}

function parseArticles(resXML, sourceObj) {
	const $ = cheerio.load(resXML, {
		normalizeWhitespace: true,
		xmlMode: true
	});
	let storyCollection = [];
	getSourceInfo().then(FBSourceObj => {
		// go through each item tag in xml/rss feed, and set properties for that story
		$('item')
			.toArray()
			.forEach((article, index) => {
				// let $article = $(article);
				let articleDate = $(article)
					.find(source.dateSearch)
					.text();
				// TODO date check before adding story
				if (moment.utc(articleDate).isAfter(FBSourceObj.lastUpdated)) {
					let storyObject = {};
					storyObject.source = source.source_id;
					storyObject.date = articleDate;
					storyObject.headline = $(article)
						.find(source.headlineSearch)
						.text();
					storyObject.link = $(article)
						.find(source.linkSearch)
						.text();
					storyObject.copy = $(article)
						.find(source.copySearch)
						.text();
					storyObject.imageURL = $(article)
						.find(source.imageURLSearch)
						.attr('url');
					storyObject.byline = $(article)
						.find(source.bylineSearch)
						.text();
					storyObject.keywords = [];
					// for each keyword entry, strip special characters then add to array
					$(article)
						.find(source.keywordSearch)
						.toArray()
						.forEach(keyword => {
							let cleanedKeyword = $(keyword)
								.text()
								.replace(/[^\w\s]/gi, '');
							storyObject.keywords.push(cleanedKeyword);
						});
					pushStoryToFB(storyObject);
				}
			});
		let feedUpdate = $(source.lastUpdatedSearch).text();
		let utcFeedUpdate = moment.utc(feedUpdate);
		FBSourceObj.lastUpdated = utcFeedUpdate;
		patchSourceInfo(FBSourceObj);
	});
}

function parseNewSourceInfo(resXML) {
	const $ = cheerio.load(resXML, {
		normalizeWhitespace: true,
		xmlMode: true
	});
	// go through each item tag in xml/rss feed, and set properties for that story
	let sourceObj = {};
	let feedUpdate = $(source.lastUpdatedSearch).text();
	sourceObj.lastUpdated = moment.utc(feedUpdate);
	sourceObj.source_id = source.source_id; //id for NYT
	sourceObj.name = source.name; //NAME
	sourceObj.homepageURL = $(source.homepageURLSearch).text();
	sourceObj.logoURL = $(source.logoURLSearch).text();
	sourceObj.feedURL = source.feedURL;
	sourceObj.bias = source.bias;
	// console.log('sourceObj', sourceObj);
	postNewSource(sourceObj);
}

function patchSourceInfo(sourceObj) {
	return new Promise((resolve, reject) => {
		let keyed = sourceObj.key;
		delete sourceObj.key;
		let stringySource = JSON.stringify(sourceObj);
		request.patch(
			{
				url: `${firebaseURL}sources/${keyed}.json`,
				form: stringySource
			},
			function(error, response, body) {
				if (error) {
					console.log('error', error);
				} else {
					console.log('patched source', response.body);
				}
			}
		);
		resolve(stringySource);
	});
}

function pushStoryToFB(storyObject) {
	return new Promise((resolve, reject) => {
		let stringyStory = JSON.stringify(storyObject);
		request.post(`${firebaseURL}/articles.json`).form(stringyStory);
		resolve(stringyStory);
	});
}

function postNewSource(sourceObj) {
	return new Promise((resolve, reject) => {
		let stringySource = JSON.stringify(sourceObj);
		request.post(`${firebaseURL}/sources.json`).form(stringySource);
		console.log('new Source Posted to FB', stringySource);
		resolve(stringySource);
	});
}

function getSourceInfo() {
	return new Promise((resolve, reject) => {
		request.get(
			`${firebaseURL}/sources.json?orderBy="source_id"&equalTo="${source.source_id}"`,
			(error, response, responseData) => {
				if (error) {
					console.log('error', error);
					reject();
				} else {
					let parsedResponse = JSON.parse(responseData);
					let key = Object.keys(parsedResponse)[0];
					parsedResponse[key].key = key;
					resolve(parsedResponse[key]);
				}
			}
		);
	});
}

// function checkSourceUpdate(source_id) {
// 	return new Promise( (resolve, reject) => {
// TODO
// 	});
// }

//scrape the page
//TODO dry this up, automate new source adding
scrapePage(source.feedURL)
	.then(resXML => {
		// getSourceInfo()
		// .then( (sourceObj) => {
		// 	console.log('sourceObj', sourceObj);
		parseArticles(resXML);
		// parseNewSourceInfo(resXML);
		console.log('ITEMS SENT TO FIREBASE');
		// })
		// .catch( (err) => {
		// 	console.log('error grabbing source info from FB', err);
		// });
	})
	.catch(err => {
		console.log('error', err);
	});
