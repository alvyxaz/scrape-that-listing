var express     = require('express');
var request     = require('request');
var cheerio     = require('cheerio');
var api         = express();

api.listen('8081');

console.log("Server started successfully")

module.exports = api;