const { express, controllers, repositories, useCases, middlewares } = require('./abstracts/common.js');

const router = express.Router();

const orderRepo = repositories.orderRepository;
const orderUseCase = useCases.orderUseCases(orderRepo);
const orderController = controllers.orderController(orderUseCase);

router.post("/orders/payment", orderController.storePayment);

module.exports = (app) => {
    app.use('/', router);
};
