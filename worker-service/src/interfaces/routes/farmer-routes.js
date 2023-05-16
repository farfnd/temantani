const { express, controllers, repositories, useCases, middlewares } = require('./abstracts/common.js');

const router = express.Router();

const farmerRepo = repositories.farmerRepository();
const farmerUseCase = useCases.farmerUseCases(farmerRepo);
const farmerController = controllers.farmerController(farmerUseCase);

router.use(middlewares.admin);

router.get("/", farmerController.getAllFarmers);
router.get("/:id", farmerController.getFarmerById);
router.post("/", farmerController.createFarmer);
router.put("/:id", farmerController.updateFarmerById);
router.delete("/:id", farmerController.deleteFarmerById);

module.exports = (app) => {
    app.use('/farmers', router);
};