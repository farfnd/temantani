const { Router } = require('express');

const router = Router();

module.exports = (app, controller) => {
    router.get("/", controller.getCurrentAdmin);
    router.put("/", controller.update);

    app.use("/me", router);
};