var express = require('express');
var app = express();
var path = require('path');
var jimp = require('Jimp');
var constants = require('./public/js/constants');
var Drone = require('./public/js/drone2');
var fetch = require('node-fetch');
var droneobject = require('./public/js/data');

let imageData = [
  [0xFF0000FF, 0xFF0000FF, 0xFF0000FF, 0xFF0000FF, 0xFF0000FF, 0xFF0000FF, 0xFF0000FF, 0xFF0000FF, 0xFF0000FF, 0xFF0000FF, 0xFF0000FF],
]


app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  let dronecount = 1;
  droneobject["droneCount"] = dronecount;

  for (let index = 0; index < dronecount; index++) {
    let drone = new Drone();
    drone.createDrone();

  }
  setInterval(function () {
    if (dronecount == Object.keys(droneobject).length - 1) {
      // console.log(Object.keys(droneobject).length);
      Object.keys(droneobject).forEach(function (key) {
        var val = droneobject[key];
         console.log(val);

      });
    }
  }, 1000)


  res.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(3000);


/*  setInterval(function () {
    let image = new jimp(1000, 1000, function (err, image) {
      if (err) throw err;

      imageData.forEach((row, y) => {
        ///console.log(row);
        row.forEach((color, x) => {
          // console.log(x + " - > " + y);
          image.setPixelColor(color, x * 5, y * 2);

        });
      });

      image.write('test.png', (err) => {
        if (err) throw err;
      });
    });
  }, 5000);*/