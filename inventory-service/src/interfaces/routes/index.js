const productRoutes = require('./product-routes.js');

module.exports = function (app, eventPublisher) {
    productRoutes(app);
};
