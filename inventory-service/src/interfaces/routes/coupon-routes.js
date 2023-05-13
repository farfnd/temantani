import { express, controllers, repositories, useCases, authMiddleware } from './abstracts/common.js';

const router = express.Router();

const couponRepo = repositories.couponRepository()
const couponUseCase = useCases.couponUseCases(couponRepo)
const couponController = controllers.couponController(couponUseCase)

router.use(authMiddleware);

router.get("/", couponController.getAllCoupons);
router.get("/:id", couponController.getCouponById);
router.post("/", couponController.createCoupon);
router.put("/:id", couponController.updateCouponById);
router.delete("/:id", couponController.deleteCouponById);

export default (app) => {
    app.use('/coupons', router);
};
