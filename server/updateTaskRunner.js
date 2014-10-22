var _ = require('lodash');

var UpdateTaskRunner = function () {
    var self = this;

    var scrappers = [];

    self.start = function () {
        update();
        setInterval(update, 60000);
    };

    self.registerScrapper = function (name, scrapper) {
        scrappers.push(scrapper);
    };

    function update () {
        _(scrappers).each(function (scrapper) {
            scrapper.update();
        });
    };

};

module.exports = new UpdateTaskRunner();