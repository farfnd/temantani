const { express, controllers, repositories, useCases } = require('./abstracts/common.js');

const router = express.Router();

module.exports = function(app, eventPublisher) {
    const authRepo = repositories.authRepository(eventPublisher)
    const authUseCase = useCases.authUseCases(authRepo)
    const authController = controllers.authController(authUseCase)
    
    router.post("/register", authController.register);
    router.post("/login", authController.login);

    app.use('/', router);
};
