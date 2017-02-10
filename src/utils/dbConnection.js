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

    insertOne: function(collectionName) {
        log.info('inserting into: ' + collectionName + conn);
        let collection = conn.collection(collectionName);
        log.info('afer getting coll');
        collection.insert({
            name: 'fern2',
            gender: 'm',
            weight: 450,
            loves: ['cheese'],
        },
                log.info('afer getting coll4'),
            function(err, result) {
                log.info(result);
                log.info(err);
            });
        log.info('afer getting coll2');
    },
};

