var updateTask  = require('../updateTaskRunner'),
    request     = require('request');

var BaseScrapper = function (name, options) {
    this.name = name;
    this.options = options;
    this.items = [];

    this.loadHTML = function () {
        if (this.options.url) {

        };
    };

    this.parseHTML = function (html) {};

    // Registering the scrapper to update task
    updateTask.registerScrapper(name, this);
}

BaseScrapper.prototype.update = function () {

};

module.exports = BaseScrapper;