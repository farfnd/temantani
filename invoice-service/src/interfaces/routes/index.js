const middlewares = require('../../application/middlewares');

const invoiceRoutes = require('./invoice-routes.js');
const invoiceDependency = require('../dependencies/invoice-dependency.js');

module.exports = function (app) {
    const controllers = {
        invoiceController: invoiceDependency()
    }
    
    app.use(middlewares.auth);
    invoiceRoutes(app, controllers.invoiceController);
};
