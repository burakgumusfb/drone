var constants = require('../js/constants');
var BaseDrone = require('../js/basedrone');
var helper = require('../js/helper');

class Drone extends BaseDrone {

    constructor() {
        super();
        this._drone = this.drone(this._droneName);

    }

    createDrone() {

        let direction = this._direction;
        let battery = this._battery;
        let pixel = 0;
        this.Fly(direction, battery, pixel, this._drone)
    }

    Fly(direction, battery, pixel, drone) {

        let halfbattery = battery / 2;
        let state = true;

        let interval = setInterval(function () {

            if (pixel > halfbattery && state) {
                state = false;
                let neighbordirection = helper.helper.randomneighborvisit();
                direction = neighbordirection;
            }

            if (pixel < battery) {

            }
            else {

                clearInterval(interval);
            }

            pixel++;
        }, constants.DURATION);
    }
}

module.exports = Drone;