const productRoutes = require('./product-routes.js');
const addressRoutes = require('./address-routes.js');
const orderRoutes = require('./order-routes.js');

module.exports = function (app, eventPublisher) {
    productRoutes(app);
    addressRoutes(app);
    orderRoutes(app);
};
