var constants = require('../js/constants');
var BaseDrone = require('../js/basedrone');
var helper = require('../js/helper');

// var container = document.getElementById("container");

class Drone extends BaseDrone {

    constructor() {
        super();
        let drone = this.drone(this._droneName);
        //container.innerHTML += drone;
    }
     createDrone() {
         console.log('i');
      }
    // createDrone() {
    //     this._data.then(d => this.beforeFly(d))
    // }

    // beforeFly(data) {

    //     let direction = this._direction;
    //     let battery = this._battery;
    //     let pixel = 0;
    //     let drone = document.getElementById(this._droneName);
    //     this.Fly(data, direction, battery, pixel, drone)

    // }

    // Fly(data, direction, battery, pixel, drone) {

    //     let halfbattery = battery / 2;
    //     let state = true;

    //     let interval = setInterval(function () {

    //         if (pixel > halfbattery && state) {
    //             state = false;
    //             helper.batteryhalf(drone);
    //             let neighbordirection = helper.randomneighborvisit();
    //             helper.neighborvisit(data, neighbordirection)
    //             direction = neighbordirection;
    //         }

    //         if (pixel < battery) {

    //             switch (direction) {
    //                 case 0:
    //                     drone.style.top = pixel;
    //                     break;
    //                 case 1:
    //                     drone.style.bottom = pixel;
    //                     break;
    //                 case 2:
    //                     drone.style.left = pixel;
    //                     break;
    //                 case 3:
    //                     drone.style.right = pixel;
    //                     break;
    //             }
    //         }
    //         else {

    //             helper.batteryfinished(drone);
    //             clearInterval(interval);
    //         }

    //         pixel++;
    //     }, constants.DURATION);
    // }


}
module.exports = Drone;
