import { express, controllers, repositories, useCases, authMiddleware } from './abstracts/common.js';

const router = express.Router();

const userRepo = repositories.userRepository()
const userUseCase = useCases.userUseCases(userRepo)
const userController = controllers.userController(userUseCase)

router.use(authMiddleware);

router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.post("/", userController.createUser);
router.put("/:id", userController.updateUserById);
router.delete("/:id", userController.deleteUserById);

export default (app) => {
    app.use('/users', router);
};