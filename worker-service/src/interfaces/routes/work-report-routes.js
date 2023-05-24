const { express, controllers, repositories, useCases, middlewares } = require('./abstracts/common.js');

const router = express.Router();

const workReportRepo = repositories.workReportRepository;
const workReportUseCase = useCases.workReportUseCases(workReportRepo);
const workReportController = controllers.workReportController(workReportUseCase);

router.use(middlewares.admin);

router.get("/", workReportController.index);
router.get("/:id", workReportController.show);
router.post("/", workReportController.store);
router.put("/:id", workReportController.update);
router.delete("/:id", workReportController.destroy);

module.exports = (app) => {
    app.use('/work-reports', router);
};