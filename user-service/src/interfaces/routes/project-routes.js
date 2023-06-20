const { express, controllers, repositories, useCases, middlewares } = require('./abstracts/common.js');

const router = express.Router();

const projectRepo = repositories.projectRepository();
const projectUseCase = useCases.projectUseCases(projectRepo);
const projectController = controllers.projectController(projectUseCase);

router.get("/", projectController.getAllProjects);
router.get("/:id", projectController.getProjectById);

module.exports = (app) => {
    app.use('/projects', router);
};