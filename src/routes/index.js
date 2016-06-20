/**
 * Created by Viktoriia_Goncharuk on 6/16/2016.
 */

var controller = require('../controllers');

module.exports = function (app) {

    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });
    
    app.post('/calculate', function (req, res) {
        controller.handleCalculationRequest(req, res);
    });
};