'use strict';

const request = require('request'),
			express = require('express'),
			cheerio = require('cheerio'),
			cors_proxy = require('cors-anywhere'),
			app = express();

const PORT = process.env.PORT || 3000;

