'use strict';

exports.Breitbart = {
	//source info
	name: 'Breitbart',
	source_id: '000',
	filename: 'Breitbart',
	bias: 'farRight',
	feedURL: 'http://feeds.feedburner.com/breitbart?format=xml',
	homepageURLSearch: 'channel > link',
	logoURLSearch: 'channel image url',
	lastUpdatedSearch: 'channel > lastBuildDate',
	//article info
	headlineSearch: 'title',
	linkSearch: 'guid',
	copySearch: 'description',
	imageURLSearch: 'media\\:content',
	bylineSearch: 'dc\\:creator',
	keywordSearch: 'category',
	dateSearch: 'pubDate',
	dateFormat: 'ddd, DD MMM YYYY HH:mm:ss GMT'
};

exports.NewYorkTimes = {
	//source info
	name: 'New York Times',
	source_id: '001',
	filename: 'NYT',
	bias: 'center',
	feedURL: 'http://www.nytimes.com/services/xml/rss/nyt/HomePage.xml',
	homepageURLSearch: 'channel > link',
	logoURLSearch: 'channel image url',
	lastUpdatedSearch: 'channel > lastBuildDate',
	//article info
	headlineSearch: 'title',
	linkSearch: 'guid',
	copySearch: 'description',
	imageURLSearch: 'media\\:content',
	bylineSearch: 'dc\\:creator',
	keywordSearch: 'category',
	dateSearch: 'pubDate',
	dateFormat: 'ddd, DD MMM YYYY HH:mm:ss GMT'
};

exports.NationalReview = {
	//source info
	name: 'The National Review',
	source_id: '002',
	filename: 'NRO',
	bias: 'right',
	feedURL: 'http://www.nationalreview.com/corner/feed',
	homepageURLSearch: 'channel > link',
	logoURLSearch: false,
	lastUpdatedSearch: 'channel > lastBuildDate',
	//article info
	headlineSearch: 'title',
	linkSearch: 'link',
	copySearch: 'description',
	imageURLSearch: 'media\\:content',
	bylineSearch: 'dc\\:creator',
	keywordSearch: 'category',
	dateSearch: 'pubDate'
};

exports.MSNBC = {
	//source info
	name: 'MSNBC',
	source_id: '003',
	filename: 'MSNBC',
	bias: 'left',
	feedURL: 'http://www.msnbc.com/feeds/latest',
	homepageURLSearch: 'channel > link',
	logoURLSearch: 'image url',
	lastUpdatedSearch: 'channel > lastBuildDate',
	//article info
	headlineSearch: 'title',
	linkSearch: 'link',
	copySearch: 'description',
	imageURLSearch: 'media\\:thumbnail',
	bylineSearch: false,
	keywordSearch: false,
	dateSearch: 'pubDate'
};

exports.NationalPublicRadio = {
	//source info
	name: 'NPR',
	source_id: '004',
	filename: 'NPR',
	bias: 'center',
	feedURL: 'http://www.npr.org/rss/rss.php?id=1001',
	homepageURLSearch: 'channel > link',
	logoURLSearch: 'image url',
	lastUpdatedSearch: 'channel > lastBuildDate',
	//article info
	headlineSearch: 'title',
	linkSearch: 'guid',
	copySearch: 'description',
	imageURLSearch: 'content\\:encoded img',
	bylineSearch: 'dc\\:creator',
	keywordSearch: 'category',
	dateSearch: 'pubDate'
};
