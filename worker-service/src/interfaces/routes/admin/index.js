const { Router, controllers, middlewares } = require('../abstracts/');

const meRoutes = require('./me-routes.js');
const workerRoutes = require('./worker-routes.js');
const workOfferRoutes = require('./work-offer-routes.js');
const workReportRoutes = require('./work-report-routes.js');

module.exports = function (app) {
    const adminRouter = Router();
    adminRouter.use(middlewares.admin);
    app.use("/admin", adminRouter);
    
    meRoutes(adminRouter, controllers.adminController);
    workerRoutes(adminRouter, controllers.workerController);
    workOfferRoutes(adminRouter, controllers.workOfferController);
    workReportRoutes(adminRouter, controllers.workReportController);
};

