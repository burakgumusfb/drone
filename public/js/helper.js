var constants = require('../js/constants');
var fetch = require("node-fetch");
var droneobject = require('../js/data');

class helper {

    static dronename() {
        function _p8(s) {
            var p = (Math.random().toString(16) + "000000000").substr(2, 8);
            return s ? "-" + p.substr(0, 4) + "-" + p.substr(4, 4) : p;
        }
        return _p8() + _p8(true) + _p8(true) + _p8();
    }
    static randomneighborvisit() {
        let number = Math.floor(Math.random() * Math.floor(constants.DIRECTION));
        return number;

    }
    static randomxory() {
        let number = Math.floor(Math.random() * Math.floor(constants.XY));
        return number;

    }
    static neighborvisit(data, neighbordirection, resp) {
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

        fetch(constants.API_URL2 + direction)
            .then(function (r) {
                return r.json()
            })
            .then(function (d) {
                resp(d.color);
            });
    }
}

module.exports = helper;