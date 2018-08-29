var express = require('express');
var app = express();
var path = require('path');
var Jimp = require('Jimp');
var Drone = require('./public/js/drone');
var droneobject = require('./public/js/data');
var hexRgb = require('hex-rgb');
var fs = require('fs');



app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {


  removeMap();
  let dronecount = 40;
  let i = 0;
  var interval = setInterval(function () {

    if (dronecount <= dronecount) {
      let drone = new Drone();
      drone.createDrone();
      console.log("Created" + i);
    }
    if (i >= dronecount) {
      clearInterval(interval);
    }
    i++;
  }, 2000)


  let currentInterval = setInterval(function () {
    var totalobject = Object.keys(droneobject).length;
    if (totalobject >= dronecount) {

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
            image.rgba(false)
            image.background(0x000FF000)
            image.write('./public/image/dronemap.png', (err) => {
              if (err) throw err;
            });
            clearInterval(currentInterval);
          }
        });
      });
    }
    console.log('interval -->' + Object.keys(droneobject).length);
  }, 5000)

  res.sendFile(path.join(__dirname + '/index.html'));
});

function removeMap() {
  var path = __dirname + '/public/image/dronemap.png';
  if (fs.existsSync(path)) {
    fs.unlinkSync(path);
  }
}
app.listen(3000);
