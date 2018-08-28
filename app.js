var express = require('express');
var app = express();
var path = require('path');
var Jimp = require('Jimp');
var constants = require('./public/js/constants');
var Drone = require('./public/js/drone2');
const fetch = require('node-fetch');


let imageData = [
  [0xFF0000FF, 0xFF0000FF, 0xFF0000FF, 0xFF0000FF, 0xFF0000FF, 0xFF0000FF, 0xFF0000FF, 0xFF0000FF, 0xFF0000FF, 0xFF0000FF, 0xFF0000FF],
]


app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {

  for (let index = 0; index < 1; index++) {
    let drone = new Drone();
    drone.createDrone();
  }
  let image = new Jimp(1000,1000, function (err, image) {
    if (err) throw err;
   
    imageData.forEach((row, y) => {
      ///console.log(row);
      row.forEach((color, x) => {
       // console.log(x + " - > " + y);
        image.setPixelColor(color, x*5 , y*2);
 
      });
    });

    image.write('test.png', (err) => {
      if (err) throw err;
    });
  });

  res.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(3000);