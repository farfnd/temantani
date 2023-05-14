import { express, controllers, repositories, useCases, authMiddleware } from './abstracts/common.js';

const router = express.Router();

const cartRepo = repositories.cartRepository()
const cartUseCase = useCases.cartUseCases(cartRepo)
const cartController = controllers.cartController(cartUseCase)

router.use(authMiddleware)

router.post("/", cartController.addCart)              // add to cart
router.put("/:id", cartController.updateCartById)     // update cart (increment, decrement)
router.delete("/", cartController.deleteUserCart)     // empty cart
router.delete("/:id", cartController.deleteCartById)  // delete cart item
router.get("/", cartController.getUserCart)           // retrieve cart
router.get("/:id", cartController.getCartById)        // retrieve cart item

export default (app) => {
    app.use('/cart', router);
};