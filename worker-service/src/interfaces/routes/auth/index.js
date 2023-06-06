const { Router, controllers, middlewares } = require('../abstracts');

const projectRoutes = require('./project-routes.js');

module.exports = function (app) {
    const authRouter = Router();
    authRouter.use(middlewares.auth);
    app.use("/", authRouter);
    
    projectRoutes(authRouter, controllers.projectController);
};

