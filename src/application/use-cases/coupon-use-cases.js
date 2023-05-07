export default (repository) => {
    const useCases = {
        getAllCoupons: () => {
            return repository.getAllCoupons()
        },
        getCouponById: (id) => {
            return repository.getCouponById(id)
        },
        createCoupon: (body) => {
            return repository.createCoupon(body)
        },
        updateCoupon: (id, body) => {
            return repository.updateCoupon(id, body)
        },
        deleteCoupon: (id) => {
            return repository.deleteCoupon(id)
        },
    };

    return useCases;
}