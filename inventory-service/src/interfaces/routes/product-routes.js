import { express, controllers, repositories, useCases, authMiddleware } from './abstracts/common.js';

const router = express.Router();

const productRepo = repositories.productRepository()
const productUseCase = useCases.productUseCases(productRepo)
const productController = controllers.productController(productUseCase)

router.use(authMiddleware);

router.get("/", productController.getAllProducts);
router.get("/:id", productController.getProductById);
router.post("/", productController.createProduct);
router.put("/:id", productController.updateProductById);
router.delete("/:id", productController.deleteProductById);

export default (app) => {
    app.use('/products', router);
};
