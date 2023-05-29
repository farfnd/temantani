const invoiceRoutes = require('./invoice-routes.js');

module.exports = function (app) {
    invoiceRoutes(app);
};
