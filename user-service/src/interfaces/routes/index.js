const authRoutes = require('./auth-routes.js');
const customRoutes = require('./custom-routes.js');
const userRoutes = require('./user-routes.js');
const landRoutes = require('./land-routes.js');

module.exports = function (app, eventPublisher) {
    landRoutes(app);
    authRoutes(app, eventPublisher);
    customRoutes(app);
    userRoutes(app);
};
