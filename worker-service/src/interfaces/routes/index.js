const customRoutes = require('./custom-routes.js');
const farmerRoutes = require('./farmer-routes.js');
const workOfferRoutes = require('./work-offer-routes.js');
const workReportRoutes = require('./work-report-routes.js');

module.exports = function (app) {
    customRoutes(app);
    farmerRoutes(app);
    workOfferRoutes(app);
    workReportRoutes(app);
};
