var express = require('express');
var app = express();
var path = require('path');
var jimp = require('Jimp');
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
  setInterval(function () {
    if (dronecount == Object.keys(droneobject).length) {

      Object.keys(droneobject).forEach(function (key) {
        let val = droneobject[key];
        var d = val.split(';');
        console.log(d[0] + " ıncı");
        let image = new jimp(15, 15, function (err, image) {
          if (err) throw err;

          var c = HEXToVBColor(d[0]);
          console.log(c);
          image.setPixelColor(c, 0, 0);
          image.setPixelColor(c, 1, 0);
          image.setPixelColor(c, 2, 0);
          image.setPixelColor(c, 3, 0);
          image.setPixelColor(c, 4, 0);
          image.setPixelColor(c, 5, 0);
          image.setPixelColor(c, 6, 0);
          image.setPixelColor(c, 7, 0);
          image.setPixelColor(c, 8, 0);
          image.setPixelColor(c, 9, 0);
          image.setPixelColor(c, 10, 0);
          image.setPixelColor(c, 11, 0);
          image.setPixelColor(c, 12, 0);
          image.setPixelColor(c, 13, 0);
          image.setPixelColor(c, 14, 0);
          image.setPixelColor(c, 15, 0);

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