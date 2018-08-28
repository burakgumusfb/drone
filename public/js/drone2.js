var constants = require('../js/constants');
var BaseDrone = require('../js/basedrone');
var helper = require('../js/helper');
var fetch = require("node-fetch");

class Drone extends BaseDrone {

    constructor() {
        super();
        this._drone = this.drone(this._droneName);

    }
    createDrone() {
        fetch(constants.API_URL1).then(r => r.json())
            .then(d => this.fly(d))
            .catch(x => console.log(x));
    }
    fly(d) {
        let data = d;
        let battery = this._battery;
        let roadGoing = 0;

        let halfbattery = battery / 2;
        let state = true;

        let interval = setInterval(function () {

            if (roadGoing > halfbattery && state) {
                state = false;
                let randomneighborvisit = helper.randomneighborvisit();
                helper.neighborvisit(data, randomneighborvisit);
            }

            if (roadGoing > battery)
                clearInterval(interval);

            roadGoing++;
            
        }, constants.DURATION);

    }

}

module.exports = Drone;