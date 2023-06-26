const AbstractUseCase = require('./abstracts/base-use-cases');
const OrderStatus = require('../../domain/enums/OrderStatus');
const errors = require('../../support/errors');
const OrderService = require('../../domain/services/order-service');

class OrderUseCase extends AbstractUseCase {
    constructor(repository) {
        super(repository);
    }

    async update(id, data, options = {}) {
        if (! (
            await OrderService.verifyOrderExists(id)
            && await OrderService.isTransitionAllowed(id, data.status)
        )) {
            return;
        }
        return super.update(id, data, options);
    }

    async paymentPaid(orderId, transactionId, grossAmount, paymentType) {
        try {
            if(! (
                await OrderService.verifyOrderExists(orderId)
                && await OrderService.isTransitionAllowed(orderId, OrderStatus.PAID)
                && await OrderService.isOrderNotExpired(orderId)
            )) {
                return;
            }
            await this.repository.update(orderId, {
                transactionId,
                status: OrderStatus.PAID,
                paymentMethod: paymentType,
                paymentAmount: grossAmount
            });
        } catch (error) {
            console.log('error:', error);
            throw error;
        }
    }
}

module.exports = (repository) => {
    const useCases = new OrderUseCase(repository);
    return useCases;
};
