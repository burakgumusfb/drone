var express = require('express');
var app = express();
var path = require('path');
var Jimp = require('Jimp');
var constants = require('./public/js/constants');
var Drone = require('./public/js/drone');
var fetch = require('node-fetch');
var droneobject = require('./public/js/data');

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
  function HEXToVBColor(rrggbb) {
    var bbggrr = rrggbb.substr(4, 2) + rrggbb.substr(2, 2) + rrggbb.substr(0, 2);
    return parseInt(bbggrr, 16);
  }

  function VBColorToHEX(i) {
    var hex = (i & 0xFF).toString(16) +
      ((i >> 8) & 0xFF).toString(16) +
      ((i >> 16) & 0xFF).toString(16) +
      ((i >> 24) & 0xFF).toString(16);

    hex += '000000'; // pad result
    hex = hex.substring(0, 6);
    return "#" + hex;
  }

  setInterval(function () {
    if (dronecount == Object.keys(droneobject).length) {

      Object.keys(droneobject).forEach(function (key) {
        let val = droneobject[key];
        var d = val.split(';');
        console.log(d[0] + " ıncı");
        let image = new Jimp(15, 15, function (err, image) {


          var l =  Jimp.rgbaToInt(255, 255, 255, 255);
          var c = VBColorToHEX(0xFF0000FF)
          console.log(l);
          image.setPixelColor(0xFF00FF, 0, 0);
          image.setPixelColor(0xFF00FF, 1, 0);
          image.setPixelColor(0xFF00FF, 2, 0);
          image.setPixelColor(0xFF00FF, 3, 0);
          image.setPixelColor(0xFF00FF, 4, 0);
          image.setPixelColor(0xFF00FF, 5, 0);
          image.setPixelColor(0xFF00FF, 6, 0);
          image.setPixelColor(0xFF00FF, 7, 0);
          image.setPixelColor(0xFF00FF, 8, 0);
          image.setPixelColor(0xFF00FF, 9, 0);
          image.setPixelColor(0xFF00FF, 10, 0);

          image.write('dronemap.png', (err) => {
            if (err) throw err;
          });
        });

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