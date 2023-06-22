const { Router } = require('express');
const middlewares = require('../../application/middlewares');

const router = Router();

module.exports = (app, controller) => {
    router.get("/", controller.index);
    router.get("/:id", controller.show);
    router.get("/:id/image", controller.showImage);
    
    router.use((req, res, next) => {
        if (req.method !== 'GET') {
            middlewares.admin(req, res, next);
        } else {
            next();
        }
    });

    router.post("/", controller.store);
    router.put("/:id", controller.update);
    router.delete("/:id", controller.destroy);

    app.use('/products', router);
};
