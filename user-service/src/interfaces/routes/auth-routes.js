import { express, controllers, repositories, useCases } from './abstracts/common.js';

const router = express.Router();

export default (app, eventPublisher) => {
    const authRepo = repositories.authRepository(eventPublisher)
    const authUseCase = useCases.authUseCases(authRepo)
    const authController = controllers.authController(authUseCase)
    
    router.post("/register", authController.register);
    router.post("/login", authController.login);

    app.use('/', router);
};