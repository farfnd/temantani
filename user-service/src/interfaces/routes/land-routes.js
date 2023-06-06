const { express, controllers, repositories, useCases, middlewares } = require('./abstracts/common.js');

const router = express.Router();

const landRepo = repositories.landRepository();
const landUseCase = useCases.landUseCases(landRepo);
const landController = controllers.landController(landUseCase);

router.get("/", landController.getAllLands);
router.get("/:id", landController.getLandById);

module.exports = (app) => {
    app.use('/lands', router);
};