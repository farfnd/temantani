const { express, controllers, repositories, useCases, middlewares } = require('./abstracts/common.js');

const router = express.Router();

const userRepo = repositories.userRepository();
const userUseCase = useCases.userUseCases(userRepo);
const userController = controllers.userController(userUseCase);

router.use(middlewares.auth);

router.get("/me", userController.getCurrentUser);
router.put("/me", userController.updateCurrentUser);

module.exports = (app) => {
    app.use('/', router);
};
