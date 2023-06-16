const { Router, middlewares } = require('../abstracts/');

const meRoutes = require('./me-routes.js');
const workOfferRoutes = require('./work-offer-routes.js');
const workReportRoutes = require('./work-report-routes.js');

const workerDependency = require('../../dependencies/worker-dependency.js');
const workOfferDependency = require('../../dependencies/work-offer-dependency.js');
const workReportDependency = require('../../dependencies/work-report-dependency.js');

module.exports = function (app, eventPublisher) {
    const controllers = {
        workerController: workerDependency(eventPublisher),
        workOfferController: workOfferDependency(),
        workReportController: workReportDependency(),
    }
    const workerRouter = Router();
    workerRouter.use(middlewares.worker);
    app.use("/worker", workerRouter);
    
    meRoutes(workerRouter, controllers.workerController);
    workOfferRoutes(workerRouter, controllers.workOfferController);
    workReportRoutes(workerRouter, controllers.workReportController);
};

