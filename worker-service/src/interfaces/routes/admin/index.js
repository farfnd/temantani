const { Router, middlewares } = require('../abstracts/');

const meRoutes = require('./me-routes.js');
const workerRoutes = require('./worker-routes.js');
const workOfferRoutes = require('./work-offer-routes.js');
const workReportRoutes = require('./work-report-routes.js');

const adminDependency = require('../../dependencies/admin-dependency.js');
const workerDependency = require('../../dependencies/worker-dependency.js');
const workOfferDependency = require('../../dependencies/work-offer-dependency.js');
const workReportDependency = require('../../dependencies/work-report-dependency.js');

module.exports = function (app, eventPublisher) {
    const controllers = {
        adminController: adminDependency(eventPublisher),
        workerController: workerDependency(),
        workOfferController: workOfferDependency(),
        workReportController: workReportDependency(),
    }

    const adminRouter = Router();
    adminRouter.use(middlewares.admin);
    app.use("/admin", adminRouter);

    meRoutes(adminRouter, controllers.adminController);
    workerRoutes(adminRouter, controllers.workerController);
    workOfferRoutes(adminRouter, controllers.workOfferController);
    workReportRoutes(adminRouter, controllers.workReportController);
};

