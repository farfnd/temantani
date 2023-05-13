import { express, controllers, repositories, useCases, authMiddleware } from './abstracts/common.js';

const router = express.Router();

const orderRepo = repositories.orderRepository()
const orderUseCase = useCases.orderUseCases(orderRepo)
const orderController = controllers.orderController(orderUseCase)

router.use(authMiddleware);

router.get("/", orderController.getAllOrdersByUserId);
router.post("/checkout", orderController.checkout);

export default (app) => {
    app.use('/orders', router);
};
