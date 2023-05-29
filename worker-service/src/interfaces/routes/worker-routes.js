const { express, controllers, repositories, useCases, middlewares } = require('./abstracts/common.js');

const router = express.Router();

const workerRepo = repositories.workerRepository;
const workerUseCase = useCases.workerUseCases(workerRepo);
const workerController = controllers.workerController(workerUseCase);

router.use(middlewares.admin);

router.get("/", workerController.index);
router.get("/:id", workerController.show);
router.post("/", workerController.store);
router.put("/:id", workerController.update);
router.delete("/:id", workerController.destroy);

module.exports = (app) => {
    app.use('/workers', router);
};