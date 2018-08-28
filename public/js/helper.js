var constants = require('../js/constants');
var fetch = require("node-fetch");

class helper {
    static batteryfinished(drone) {
        drone.classList.remove("high-battery");
        drone.classList.add("half-battery");
        drone.classList.add("low-battery");
    }
    static batteryhalf(drone) {
        drone.classList.remove("high-battery");
        drone.classList.add("half-battery");
    }
    static randomneighborvisit() {
        let number = Math.floor(Math.random() * Math.floor(constants.DIRECTION));
        return number;

    }

    static neighborvisit(data, neighbordirection) {
        let direction = null;
        switch (neighbordirection) {
            case 0:
                direction = data.ne;
                break;
            case 1:
                direction = data.nw;
                break;
            case 2:
                direction = data.sw;
                break;
            case 3:
                direction = data.se;
                break;
        }
        fetch(constants.API_URL2 + direction).then(r => r.json()).then(d => console.log(d.color));
    }
}

module.exports = helper;