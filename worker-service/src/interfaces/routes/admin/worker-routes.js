const { Router } = require('express');

const router = Router();

module.exports = (app, controller) => {
    router.get("/", controller.index);
    router.get("/:id", controller.show);
    router.put("/:id", controller.update);
    router.delete("/:id", controller.destroy);

    app.use("/workers", router);
};