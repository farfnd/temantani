const { Router, controllers, middlewares } = require('../abstracts/');

const meRoutes = require('./me-routes.js');
const workOfferRoutes = require('./work-offer-routes.js');
const workReportRoutes = require('./work-report-routes.js');

module.exports = function (app) {
    const workerRouter = Router();
    workerRouter.use(middlewares.worker);
    app.use("/worker", workerRouter);
    
    meRoutes(workerRouter, controllers.workerController);
    workOfferRoutes(workerRouter, controllers.workOfferController);
    workReportRoutes(workerRouter, controllers.workReportController);
};

