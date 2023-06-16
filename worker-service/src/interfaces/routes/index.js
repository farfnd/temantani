const authRoutes = require('./auth');
const adminRoutes = require('./admin');
const workerRoutes = require('./worker');
const EventPublisher = require("../../infrastructure/event-publisher.js");

module.exports = function (app, producer) {
    const eventPublisher = new EventPublisher(producer);

    authRoutes(app, eventPublisher);
    adminRoutes(app, eventPublisher);
    workerRoutes(app, eventPublisher);
};
