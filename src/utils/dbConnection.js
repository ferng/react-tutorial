const MongoClient = require('mongodb').MongoClient;
const config = require('../../config.js');
const log = require('../../src/utils/logger.js').getLogger();

let conn = undefined;

const url = 'mongodb://' + config.mongo.host + ':' + config.mongo.port + '/' + config.mongo.database;

module.exports = {
    initPool: intiPool,
    insertOne: insertOne,
    getAll: getAll,
};


// db operations
function intiPool(callback) {
        log.debug('Attempting connection to mongodb on: ' + url);
            MongoClient.connect(url, function(err, db) {
            if (err) {
                callback(err);
                log.debug('Error connecting to mongodb');
            } else {
                conn = db;
                log.debug('Connected to mongodb');
                callback(null);
            }
        });
    };

function insertOne(collectionName, document) {
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
    };

    function getAll(collectionName, callback) {
        let collection = conn.collection(collectionName);
        collection.find({}, {_id: 0}).toArray(function(err, docs) {
            log.info(docs);
            callback(docs);
        });
    };
