const authRoutes = require('./auth-routes.js');
const customRoutes = require('./custom-routes.js');
const userRoutes = require('./user-routes.js');

module.exports = function (app, eventPublisher) {
    authRoutes(app, eventPublisher);
    customRoutes(app);
    userRoutes(app);
};
