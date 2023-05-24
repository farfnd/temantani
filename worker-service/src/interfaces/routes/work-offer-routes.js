const { express, controllers, repositories, useCases, middlewares } = require('./abstracts/common.js');

const router = express.Router();

const workOfferRepo = repositories.workOfferRepository;
const workOfferUseCase = useCases.workOfferUseCases(workOfferRepo);
const workOfferController = controllers.workOfferController(workOfferUseCase);

router.use(middlewares.admin);

router.get("/", workOfferController.index);
router.get("/:id", workOfferController.show);
router.post("/", workOfferController.store);
router.put("/:id", workOfferController.update);
router.delete("/:id", workOfferController.destroy);

module.exports = (app) => {
    app.use('/work-offers', router);
};