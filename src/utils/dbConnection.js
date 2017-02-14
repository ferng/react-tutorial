const MongoClient = require('mongodb').MongoClient;
const config = require('../../config.js');
const log = require('../../src/utils/logger.js').getLogger();

let conn = undefined;

const url = 'mongodb://' + config.mongo.host + ':' + config.mongo.port + '/' + config.mongo.database;

let init = function() {
    log.info(url);
    MongoClient.connect(url, function(err, db) {
        conn = db;
        log.info('Connected to mongodb');
    });
};

module.exports = {
    initPool: function() {
        if (typeof conn == 'undefined') {
            init();
        }
    },

    insertOne: function(collectionName, document) {
        log.info('inserting into: ' + collectionName + conn);
        let collection = conn.collection(collectionName);
        log.info('afer getting coll');
        collection.insert(document,
                log.info('afer getting coll4'),
            function(err, result) {
                log.info(result);
                log.info(err);
            });
        log.info('afer getting coll2');
    },

    getAll: function(collectionName, callback) {
        let collection = conn.collection(collectionName);
      collection.find({}, {_id: 0}).toArray(function(err, docs) {
          log.info(docs);
          callback(docs);
      });
    },
};

