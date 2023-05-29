const EventPublisher = require("../../infrastructure/event-publisher.js");
const middlewares = require('../../application/middlewares');

const publicRoutes = require('./public-routes.js');
const productRoutes = require('./product-routes.js');
const addressRoutes = require('./address-routes.js');
const orderRoutes = require('./order-routes.js');

const orderDependency = require('../dependencies/order-dependency.js');
const addressDependency = require('../dependencies/address-dependency.js');
const productDependency = require('../dependencies/product-dependency.js');

module.exports = function (app, producer) {
    const eventPublisher = new EventPublisher(producer);
    const controllers = {
        orderController: orderDependency(eventPublisher),
        addressController: addressDependency(),
        productController: productDependency()
    }

    // Public routes
    publicRoutes(app, controllers);
    productRoutes(app, controllers.productController);

    // Private routes
    app.use(middlewares.auth);
    addressRoutes(app, controllers.addressController);
    orderRoutes(app, controllers.orderController);
};
