const express = require('express');
const router = new express.Router();
let log = require('./utils/logger.js').getLogger();
const db = require('./utils/dbConnection.js');


router.use((req, res, next) => {
    log.debug(req.originalUrl);
    next();
});


router.get('/', (req, res) => {
    db.getAll('laps')
        .then((data) => res.json(data))
        .catch((err) => log.error(err));
});


router.post('/', (req, res) => {
    getLap(req)
        .then((results) => db.insertOne('laps', results))
        .catch((err) => log.error(err));
});

module.exports = router;

function getLap(req) {
    let blurb = {
        id: Date.now(),
        unit: req.body.unit,
        distance: parseFloat(req.body.distance, 10),
        time: req.body.time,
    };
    return Promise.resolve(blurb);
};
