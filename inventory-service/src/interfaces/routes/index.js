const EventPublisher = require("../../infrastructure/event-publisher.js");
const productRoutes = require('./product-routes.js');
const productDependency = require('../dependencies/product-dependency.js');

module.exports = function (app, producer) {
    const eventPublisher = new EventPublisher(producer);
    const controllers = {
        productController: productDependency(eventPublisher)
    }

    productRoutes(app, controllers.productController);
};
