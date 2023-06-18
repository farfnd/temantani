const EventPublisher = require("../../infrastructure/event-publisher.js");
const PaymentGatewayService = require("../../infrastructure/midtrans.js");
const DistanceService = require("../../infrastructure/distance.js");
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
    const distanceService = new DistanceService();
    const midtransService = new PaymentGatewayService(distanceService);
    const controllers = {
        orderController: orderDependency(eventPublisher, midtransService),
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
