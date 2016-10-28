var fs = require('fs');
var path = require('path');
var express = require('express');
var router = express.Router();
var reader = require('./data/readAllData.js');

var DATA_FILE = path.join(__dirname, '../../data.json');

router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

router.get('/', function(req, res) {
    reader.readAll(res);
});


router.post('/', function(req, res) {
  fs.readFile(DATA_FILE, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    var laps = JSON.parse(data);
    var newLap = {
      id: Date.now(),
      unit: req.body.unit,
      distance: parseFloat(req.body.distance,10),
      time: req.body.time
    };
    laps.push(newLap);
    fs.writeFile(DATA_FILE, JSON.stringify(laps, null, 4), function(err) {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      res.json(laps);
    });
  });
});



module.exports = router;