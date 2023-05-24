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

module.exports = (app) => {
    app.use('/products', router);
};
