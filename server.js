const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const routeLaps = require('./src/laps/router.js');
let log = require('./src/utils/logger.js').getLogger();

app.set('port', (process.env.PORT || 3000));

app.use('/', express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

app.use('/api/laps', routeLaps);

app.listen(app.get('port'), function() {
    log.info('Server started: http://localhost:' + app.get('port') + '/');
});
