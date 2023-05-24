const { express, controllers, repositories, useCases, middlewares } = require('./abstracts/common.js');

const router = express.Router();

const productRepo = repositories.productRepository;
const productUseCase = useCases.productUseCases(productRepo);
const productController = controllers.productController(productUseCase);

router.use((req, res, next) => {
    if (req.method !== 'GET') {
        middlewares.admin(req, res, next);
    } else {
        next();
    }
});

router.get("/", productController.index);
router.get("/:id", productController.show);
router.post("/", productController.store);
router.put("/:id", productController.update);
router.delete("/:id", productController.destroy);

module.exports = (app) => {
    app.use('/products', router);
};
