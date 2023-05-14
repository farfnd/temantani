import Coupon from '../models/Coupon.js';

export default () => {
    const repository = {
        getAllCoupons: () => {
            return Coupon.findAll();
        },
        getCouponById: (id) => {
            return Coupon.find({ id }).first();
        },
        createCoupon: (body) => {
            return Coupon.create(body);
        },
        updateCoupon: (id, body) => {
            return Coupon.update(id, body);
        },
        deleteCoupon: (id) => {
            return Coupon.destroy(id);
        }
    };

    return repository;
};
