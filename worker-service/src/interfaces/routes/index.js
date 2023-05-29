const adminRoutes = require('./admin');
const workerRoutes = require('./worker');

module.exports = function (app, producer) {
    adminRoutes(app, producer);
    workerRoutes(app, producer);
};
