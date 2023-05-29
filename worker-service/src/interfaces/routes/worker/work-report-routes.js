const { Router } = require('express');

const router = Router();

module.exports = (app, controller) => {
    router.get("/", controller.index);
    router.get("/:id", controller.show);
    router.post("/", controller.store);
    router.put("/:id", controller.update);
    router.delete("/:id", controller.destroy);

    app.use("/work-reports", router);
};