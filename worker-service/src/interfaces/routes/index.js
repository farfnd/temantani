const customRoutes = require('./custom-routes.js');
const farmerRoutes = require('./farmer-routes.js');

module.exports = function (app) {
    customRoutes(app);
    farmerRoutes(app);
};
