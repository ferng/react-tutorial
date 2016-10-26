var fs = require('fs');
var path = require('path');
var DATA_FILE = path.join(__dirname, '../../../data.json');

var readAll = function() {
    return "odd";
//   fs.readFile(DATA_FILE, function(err, data) {
//     if (err) {
//       console.error(err);
//       process.exit(1);
//     }
//     return JSON.parse(data);
//   });
} 

var load = readAll();

module.exports = load;