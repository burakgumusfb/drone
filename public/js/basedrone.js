var constants = require('../js/constants');

class BaseDrone {

    constructor() {

        this._json = null;
        this._data = null;
        this._battery = this.battery();
        this._direction = this.direction();
    }

    direction() {
        let number = Math.floor(Math.random() * Math.floor(constants.DIRECTION));
        return number;
    }

    battery() {
        let number = Math.floor(Math.random() * Math.floor(constants.BATTERY_POWER));
        return number;
    }

    drone(id) {
        return "<" + "input id=" + id + " type='radio' class='high-battery'" + " />";
    }

    static lowbattery(drone) {
        drone.classList.remove("high-battery");
        drone.classList.add("low-battery");
    }
}

module.exports = BaseDrone

