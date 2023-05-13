import { express, controllers, repositories, useCases, authMiddleware } from './abstracts/common.js';

const router = express.Router();

const userRepo = repositories.userRepository()
const userUseCase = useCases.userUseCases(userRepo)
const userController = controllers.userController(userUseCase)

router.use(authMiddleware);

router.get("/me", userController.getCurrentUser);

export default (app) => {
    app.use('/', router);
};