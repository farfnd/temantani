import { express, controllers, repositories, useCases, authMiddleware } from './abstracts/common.js';

const router = express.Router();

const categoryRepo = repositories.categoryRepository()
const categoryUseCase = useCases.categoryUseCases(categoryRepo)
const categoryController = controllers.categoryController(categoryUseCase)

router.use(authMiddleware);

router.get("/", categoryController.getAllCategories);
router.get("/:id", categoryController.getCategoryById);
router.post("/", categoryController.createCategory);
router.put("/:id", categoryController.updateCategoryById);
router.delete("/:id", categoryController.deleteCategoryById);

export default (app) => {
    app.use('/categories', router);
};
