'use strict';

exports.NewYorkTimes = {
	name: "New York Times",
	source_id: "001",
	filename: "NYT",
	bias: "center",
	feedURL: 'http://www.nytimes.com/services/xml/rss/nyt/HomePage.xml',
	homepageURLSearch: "channel > link",
	logoURLSearch: "channel image url",
	lastUpdatedSearch: "channel > lastBuildDate",
	headlineSearch: 'title',
	linkSearch: "guid",
  copySearch: "description",
  imageURLSearch: "media\\:content",
  bylineSearch: "dc\\:creator",
  keywordSearch: "category",
  dateSearch: "pubDate"
};

//TODO
exports.NationalReview = {
	name: "The National Review",
	source_id: "002",
	filename: "NRO",
	bias: "right",
	feedURL: 'http://www.nationalreview.com/corner/feed',
	homepageURLSearch: "channel > link",
	logoURLSearch: "channel image url",
	lastUpdatedSearch: "channel > lastBuildDate",
	headlineSearch: 'title',
	linkSearch: "guid",
  copySearch: "description",
  imageURLSearch: "media\\:content",
  bylineSearch: "dc\\:creator",
  keywordSearch: "category",
  dateSearch: "pubDate"
};

