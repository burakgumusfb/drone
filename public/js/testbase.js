var constants = require('../js/constants');
const fetch = require('node-fetch');

class TestBase {
    constructor()
    {
           
fetch(constants.API_URL1)
.then(res => res.text())
.then(body => console.log(body));
            this.Name = "Burak";
    }
}
module.exports = TestBase;