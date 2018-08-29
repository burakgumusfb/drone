var express = require('express');
var app = express();
var path = require('path');
var Jimp = require('Jimp');
var constants = require('./public/js/constants');
var Drone = require('./public/js/drone');
var fetch = require('node-fetch');
var droneobject = require('./public/js/data');
const hexRgb = require('hex-rgb');




app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  let dronecount = 50;

  for (let index = 0; index < dronecount; index++) {
    let drone = new Drone();
    drone.createDrone();

  }


  let x = setInterval(function () {

    if (dronecount == Object.keys(droneobject).length) {
      let counter = 0;
      let image = new Jimp(1000, 1000, function (err, image) {
        Object.keys(droneobject).forEach(function (key) {
          counter++;
          let dronevalue = droneobject[key];
          let spliteddronevalue = dronevalue.split(';');
          let rgbcode = hexRgb(spliteddronevalue[0]);
          console.log(rgbcode);
          var hexcolor = Jimp.rgbaToInt(rgbcode["red"], rgbcode["blue"], rgbcode["green"], 255);
          image.setPixelColor(hexcolor, parseInt(spliteddronevalue[1]), parseInt(spliteddronevalue[2]));
          if (counter == dronecount) {
            image.write('dronemap.png', (err) => {
              if (err) throw err;
            });
            clearInterval(x);
          }
        });


      });
    }


  }, 5000)


  res.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(3000);
