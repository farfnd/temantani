const { express, controllers, repositories, useCases, middlewares } = require('./abstracts/common.js');

const router = express.Router();

const farmerRepo = repositories.farmerRepository;
const farmerUseCase = useCases.farmerUseCases(farmerRepo);
const farmerController = controllers.farmerController(farmerUseCase);

router.use(middlewares.admin);

router.get("/", farmerController.index);
router.get("/:id", farmerController.show);
router.post("/", farmerController.store);
router.put("/:id", farmerController.update);
router.delete("/:id", farmerController.destroy);

module.exports = (app) => {
    app.use('/farmers', router);
};