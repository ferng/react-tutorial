const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const routeLaps = require('./src/laps/router.js');
const config = require('./config.js');
const log = require('./src/utils/logger.js').getLogger();
const db = require('./src/utils/dbConnection.js');

app.set('port', config.runlog.port);

app.use('/', express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

app.use('/api/laps', routeLaps);

let myCallback = function(data) {
    console.log('got data: ' + data);
};

db.initPool(myCallback);

app.listen(app.get('port'), function() {
    log.info('Server started: http://localhost:' + app.get('port') + '/');
});
