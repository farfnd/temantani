const { Router } = require('express');

const router = Router();

module.exports = (app, controller) => {
    router.get("/", controller.getCurrentWorker);
    router.put("/", controller.update);

    app.use("/me", router);
};