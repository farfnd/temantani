const { Router } = require('express');

const router = Router();

module.exports = (app, controllers) => {
    router.post("/orders/payment", controllers.orderController.storePayment);
    router.get("/get-distance", controllers.orderController.getDistance);

    app.use("/", router);
};