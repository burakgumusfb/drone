var express = require('express');
var app = express();
var path = require('path');
var Jimp = require('Jimp');
var constants = require('./public/js/constants');
var Drone = require('./public/js/drone');
var fetch = require('node-fetch');
var droneobject = require('./public/js/data');
const hexRgb = require('hex-rgb');

let imageData = [
  [0xFF0000FF, 0xFF0000FF, 0xFF0000FF, 0xFF0000FF, 0xFF0000FF, 0xFF0000FF, 0xFF0000FF, 0xFF0000FF, 0xFF0000FF, 0xFF0000FF, 0xFF0000FF],
]


app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  let dronecount = 1;

  for (let index = 0; index < dronecount; index++) {
    let drone = new Drone();
    drone.createDrone();

  }


  let x = setInterval(function () {
    if (dronecount == Object.keys(droneobject).length) {

      Object.keys(droneobject).forEach(function (key) {

        let val = droneobject[key];
        var d = val.split(';');

        var l = hexRgb(d[0]);
        console.log(l["red"]);
        let image = new Jimp(1000, 1000, function (err, image) {

          var xx = Jimp.rgbaToInt(l["red"], l["blue"], l["green"], 255);
          image.setPixelColor(xx, 0, 0);

          image.write('dronemap.png', (err) => {
            if (err) throw err;
          });
        });

      });
    }
    clearInterval(x);
  }, 500)


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