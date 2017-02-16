const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const routeLaps = require('./src/laps/router.js');
const config = require('./config.js');
const log = require('./src/utils/logger.js').getLogger();
const db = require('./src/utils/dbConnection.js');

// initialize mongo db connection pool
db.initPool(openDbErrorHandler);

// initialize ap server
app.set('port', config.runlog.port);
app.use('/', express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(requestHandler);
app.use('/api/laps', routeLaps);
app.listen(app.get('port'), startServerErrorHandler);


// handlers
function requestHandler(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cache-Control', 'no-cache');
    next();
};

function openDbErrorHandler(err) {
    if (err) {
        log.fatal(err);
        process.exit(1);
    }
};

function startServerErrorHandler(err) {
    if (err) {
        log.fatal(err);
        process.exit(1);
    } else {
        log.info('Server started: http://localhost:' + app.get('port') + '/');
    }
};
