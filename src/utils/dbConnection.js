const MongoClient = require('mongodb').MongoClient;
const config = require('../../config.js');
const log = require('../../src/utils/logger.js').getLogger();

let conn;

const url = 'mongodb://' + config.mongo.host + ':' + config.mongo.port + '/' + config.mongo.database;

let init = function() {
    MongoClient.connect(url, function(err, db) {
        conn = db;
        log.info('Connected successfully to server');
    });
};

let insertOne = function(collectionName, callback) {
    let collection = conn.collection(collectionName);
    collection.insert({name: 'Leto', gender: 'm', home: 'Arrakeen', worm: false}, function(err, result) {
        assert.equal(err, null);
        assert.equal(3, result.result.n);
        assert.equal(3, result.ops.length);
        console.log('Inserted 3 documents into the collection');
        callback(result);
    });


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

module.exports = {
    conn: undefined,

    getConn: function() {
        if (typeof conn == 'undefined') {
            init();
        }
        return conn;
    },

    insert(schema, item) {
        insert;
    },
};

