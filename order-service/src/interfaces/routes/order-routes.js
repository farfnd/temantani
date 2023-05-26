const { express, controllers, repositories, useCases, middlewares } = require('./abstracts/common.js');

const router = express.Router();

const orderRepo = repositories.orderRepository;
const orderUseCase = useCases.orderUseCases(orderRepo);
const orderController = controllers.orderController(orderUseCase);

router.use(middlewares.auth);

router.get("/", orderController.index);
router.get("/:id", orderController.show);
router.post("/", orderController.store);
router.post("/payment", orderController.storePayment);
router.put("/:id", orderController.update);
router.delete("/:id", orderController.destroy);

module.exports = (app) => {
    app.use('/orders', router);
};
