const { express, controllers, repositories, useCases, middlewares } = require('./abstracts/common.js');

const router = express.Router();

const farmerRepo = repositories.farmerRepository;
const farmerUseCase = useCases.farmerUseCases(farmerRepo);
const farmerController = controllers.farmerController(farmerUseCase);

router.use(middlewares.auth);

router.get("/me", farmerController.getCurrentFarmer);

module.exports = (app) => {
    app.use('/', router);
};
