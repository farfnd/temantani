import { express, controllers, repositories, useCases, authMiddleware } from './abstracts/common.js';

const router = express.Router();

const addressRepo = repositories.addressRepository()
const addressUseCase = useCases.addressUseCases(addressRepo)
const addressController = controllers.addressController(addressUseCase)

router.use(authMiddleware);

router.get("/", addressController.getAllAddressByUserId);
router.get("/:id", addressController.getAddressById);
router.post("/", addressController.createAddress);
router.put("/:id", addressController.updateAddress);
router.delete("/:id", addressController.deleteAddress);

export default (app) => {
    app.use('/addresses', router);
};
