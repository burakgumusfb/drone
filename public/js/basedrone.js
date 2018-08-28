var constants = require('../js/constants');

class BaseDrone {

    constructor() {

        this._json = null;
        this._data = null;
        this._battery = this.battery();
        this._droneName = this.dronename();
        this._direction = this.direction();
    }
    dronename() {
        function _p8(s) {
            var p = (Math.random().toString(16) + "000000000").substr(2, 8);
            return s ? "-" + p.substr(0, 4) + "-" + p.substr(4, 4) : p;
        }
        return _p8() + _p8(true) + _p8(true) + _p8();
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

