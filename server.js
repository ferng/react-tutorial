const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const routeLaps = require('./src/laps/router.js');
const config = require('./config.js');
const log = require('./src/utils/logger.js').getLogger();

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


let insertDocuments = function(db, callback) {
  // Get the documents collection
  let collection = db.collection('documents');
  // Insert some documents
  collection.insertMany([
    {a: 1}, {a: 2}, {a: 3},
  ], function(err, result) {
    assert.equal(err, null);
    assert.equal(3, result.result.n);
    assert.equal(3, result.ops.length);
    console.log('Inserted 3 documents into the collection');
    callback(result);
  });
};

MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log('Connected successfully to server');

  insertDocuments(db, function() {
    db.close();
  });
});


app.listen(app.get('port'), function() {
    log.info('Server started: http://localhost:' + app.get('port') + '/');
});
