const express = require('express');
const router = new express.Router();
let log = require('../utils/logger.js').getLogger();
const db = require('../utils/dbConnection.js');


router.use(function timeLog(req, res, next) {
    log.debug('Time: ', Date.now());
    next();
});

router.get('/', function(req, res) {
    db.getAll('laps', function(data) {
        console.log('got data: ' + data);
        res.json(data);
    });
});


router.post('/', function(req, res) {
    let newLap = {
        id: Date.now(),
        unit: req.body.unit,
        distance: parseFloat(req.body.distance, 10),
        time: req.body.time,
    };
    db.insertOne('laps', newLap);
    // fs.readFile(DATA_FILE, function(err, data) {
    //     if (err) {
    //         log.error(err);
    //         process.exit(1);
    //     }
    //     let laps = JSON.parse(data);
    //     let newLap = {
    //         id: Date.now(),
    //         unit: req.body.unit,
    //         distance: parseFloat(req.body.distance, 10),
    //         time: req.body.time,
    //     };
    //     laps.push(newLap);
    //     fs.writeFile(DATA_FILE, JSON.stringify(laps, null, 4), function(err) {
    //         if (err) {
    //             log.error(err);
    //             process.exit(1);
    //         }
    //         res.json(laps);
    //     });
    // });
});


module.exports = router;
