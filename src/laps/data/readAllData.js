const fs = require('fs');
const path = require('path');
let log = require('../../utils/logger.js').getLogger();

const DATA_FILE = path.join(__dirname, '../../../data.json');

exports.readAll = function(res) {
    fs.readFile(DATA_FILE, function(err, data) {
        if (err) {
            log.error(err);
            process.exit(1);
        }
        res.json(JSON.parse(data));
    });
};
