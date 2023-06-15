const { Router } = require('express');

const router = Router();

module.exports = (app, controller) => {
    router.get("/", controller.index);
    router.get("/:id", controller.show);
    router.patch("/:id", controller.update);

    app.use("/work-reports", router);
};