var hash    = require('object-hash'),
    _       = require('lodash');

var ListItem = function (values) {
    this.values = values;
    this.isStarred = false;
    this.isVisited = false;
    this.isDismissed = false;
    this.key = this.getHash();
};

ListItem.prototype.valuesToHash = ['title', 'address', 'details', 'price'];

ListItem.prototype.toggleStar = function () {
    this.isStarred = !this.isStarred;
};

ListItem.prototype.markAsVisited = function () {
    this.isVisited = true;
};

ListItem.prototype.toggleDismissed = function () {
    this.isDismissed = true;
}

ListItem.prototype.getHash = function () {
    var self = this;
    var objectToHash = {};
    _.map(this.valuesToHash, function (value) {
        objectToHash[value] = self.values[value];
    });
    return hash(this.values);
}

ListItem.prototype.equals = function (listItem) {
    return this.key === listItem.key;
}

module.exports = ListItem;