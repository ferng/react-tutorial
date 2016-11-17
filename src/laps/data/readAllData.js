var fs = require('fs');
var path = require('path');
// var log = require('/src/utils/logger.js').getLogger();

var DATA_FILE = path.join(__dirname, '../../../data.json');

exports.readAll = function(res) {
  fs.readFile(DATA_FILE, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    res.json(JSON.parse(data));
  });
} 

