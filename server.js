var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var DATA_FILE = path.join(__dirname, 'data.json');

app.set('port', (process.env.PORT || 3000));

app.use('/', express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

app.get('/api/laps', function(req, res) {
  fs.readFile(DATA_FILE, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    res.json(JSON.parse(data));
  });
});

app.post('/api/laps', function(req, res) {
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


app.listen(app.get('port'), function() {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});
