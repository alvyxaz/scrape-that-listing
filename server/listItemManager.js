var Datastore   = require('nedb'),
    fs          = require('fs'),
    db          = new Datastore({ autoload: true }), // filename: 'data/list-items.db'
    request     = require('request');
    notifier    = require('node-notifier'),
    path        = require('path'),
    open        = require('open');

// Registering index key
db.ensureIndex({fieldName: 'key', unique: true});

var ListItemManager = function () {

    var items = [];

    this.checkItemIn = function (listItem) {
        db.find({key: listItem.key}, function (err, docs) {
            if (docs.length === 0) {
                persistItem(listItem);
            }
        })
    }

    function persistItem(listItem) {
        // Insert into the database
        db.insert(listItem);

        // Download the thumbnail
        downloadThumbnail(listItem.values.thumbnail, "./data/thumbnails/" + listItem.key + '.png', function () {
            // Send a notification after the thumbnail is downloaded
            sendNotification(listItem);
        });
    }


    function sendNotification(listItem) {
        notifier.notify({
            title: "[" +listItem.values.price.trim() + "]" + listItem.values.title,
            message: listItem.values.details,
            icon: path.join(__dirname + "/../data/thumbnails/", listItem.key + '.png'),
            sound: false, // Only Notification Center or Windows Toasters
            wait: true // wait with callback until user action is taken on notification
        }, function (err, response) {
            if (response.trim() === "Activated") {
                openItem(listItem);
            }

            // response is response from notification
        });
    }

    function openItem(listItem) {
        open(listItem.values.url);
    };

    function downloadThumbnail(uri, filename, callback){
        request.head(uri, function(err, res, body){
            if (res && res.statusCode === 200) {
                request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
            } else {
                callback();
            }
        });
    };
};

module.exports = new ListItemManager();