var constants = require('../js/constants');
var BaseDrone = require('../js/basedrone');
var helper = require('../js/helper');
var fetch = require("node-fetch");
var droneobject = require('../js/data');

class Drone extends BaseDrone {

    constructor(dronename) {
        super();
        this._dronename = dronename;
    }

    createDrone() {
        fetch(constants.API_URL1).then(r => r.json())
            .then(d => this.Fly(d))
            .catch(x => console.log(x));
    }

    Fly(d) {
        let data = d;
        let battery = this._battery;
        let roadgoing = 0;
        let x = 0;
        let y = 0;
        let dronename = helper.dronename();

        let interval = setInterval(function () {


            if (roadgoing < battery) {
                let xory = helper.randomxory();

                if (xory == 0)
                    x++;
                else
                    y++;
            }

            if (roadgoing > battery) {

                let randomneighborvisit = helper.randomneighborvisit();
                helper.neighborvisit(data, randomneighborvisit, function (resp) {
                    console.log(resp);
                    droneobject[dronename] = resp + ";" + x + ";" + y;
                })

                clearInterval(interval);
            }
            roadgoing++;


        }, constants.DURATION);

    }

}

module.exports = Drone;