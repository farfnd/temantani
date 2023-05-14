import { express, controllers, repositories, useCases } from './abstracts/common.js';

const router = express.Router();

const authRepo = repositories.authRepository()
const authUseCase = useCases.authUseCases(authRepo)
const authController = controllers.authController(authUseCase)

router.post("/register", authController.register);
router.post("/login", authController.login);

export default (app) => {
    app.use('/', router);
};