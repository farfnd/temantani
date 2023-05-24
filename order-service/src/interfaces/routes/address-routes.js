const { express, controllers, repositories, useCases, middlewares } = require('./abstracts/common.js');

const router = express.Router();

const addressRepo = repositories.addressRepository;
const addressUseCase = useCases.addressUseCases(addressRepo);
const addressController = controllers.addressController(addressUseCase);

router.use(middlewares.auth);

router.get("/", addressController.index);
router.get("/:id", addressController.show);
router.post("/", addressController.store);
router.put("/:id", addressController.update);
router.delete("/:id", addressController.destroy);

module.exports = (app) => {
    app.use('/addresss', router);
};
