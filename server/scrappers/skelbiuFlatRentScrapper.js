var BaseScrapper    = require('./baseScrapper');
var cheerio         = require('cheerio');
var request         = require('request');
var listItemManager = require('../listItemManager');
var ListItem        = require('../listItem');

var SkelbiuFlatRentScrapper = function () {
    BaseScrapper.call(this, "SkelbiuLt Flats", {});
    var self = this;
    var url = 'http://www.skelbiu.lt/skelbimai/?cities=43&distance=0&mainCity=0&search=1&category_id=322&keywords=&type=1&user_type=0&ad_since_min=0&ad_since_max=0&orderBy=0&detailsSearch=0&building=0&year_min=&year_max=&floor_min=&floor_max=&floor_type=0&cost_min=nuo&cost_max=iki&status=0&space_min=nuo&space_max=iki&rooms_min=&rooms_max=&search=Veskite+pavadinim%C4%85&district=0&quarter=0&streets=0&ignorestreets=0';
    var domain = 'http://www.skelbiu.lt';

    self.update = function () {
        request(url, function (error, response, html) {
            if (!error) {
                var $ = cheerio.load(html);
                $('.simpleAds').map(function (index, element) {
//                    if (index > 0) return null;
                    var $element = $(element);
                    var values = {
                        title: $element.find('h3 a').text(),
                        address: $element.find('.adsTextReview').text(),
                        details: $element.find('.adsTextMoreDetails').text(),
                        price: $element.find('.adsPrice').text().trim(),
                        thumbnail: $element.find('.adsDetails').next().find('img').attr('src'),
                        url : domain + $element.find('h3 a').attr('href')
                    };

                    var listItem = new ListItem(values);

                    listItemManager.checkItemIn(listItem);
                });
            }
        });
    }
};


SkelbiuFlatRentScrapper.prototype = Object.create(BaseScrapper.prototype);
SkelbiuFlatRentScrapper.prototype.constructor = SkelbiuFlatRentScrapper;

module.exports = new SkelbiuFlatRentScrapper();