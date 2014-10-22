var updateTask  = require('./updateTaskRunner.js'),
    listItemManager = require('./listItemManager');
var server      = require('./server.js');

// Loading all of the available scrappers
require('fs').readdirSync(__dirname + '/scrappers/').forEach(function (file) {
    var name = file.replace('.js', '');
    exports[name] = require('./scrappers/' + file);
});

// Starting the "background" task
updateTask.start();