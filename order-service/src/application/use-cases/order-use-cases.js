const AbstractUseCase = require('./abstracts/base-use-cases');
const moment = require('moment');
const OrderStatus = require('../../domain/enums/OrderStatus');
const errors = require('../../support/errors');
const config = require('../../support/config');

class OrderUseCase extends AbstractUseCase {
    constructor(repository) {
        super(repository);
    }

    async paymentPaid(orderId, transactionId, grossAmount, paymentType) {
        const order = await this.repository.getById(orderId);
        if (!order) throw errors.NotFound('Order payment is expired');

        const currentTime = moment();
        const expiryTime = moment(order.createdAt).add(config.midtrans.expiry.duration, config.midtrans.expiry.unit);

        if (currentTime.isAfter(expiryTime)) {
            throw errors.BadRequest('Order payment is expired');
        }

        try {
            await this.repository.update(orderId, {
                transactionId,
                orderStatus: OrderStatus.PAID,
                paymentMethod: paymentType,
                paymentAmount: grossAmount
            });
        } catch (error) {
            throw error;
        }
    }
}

module.exports = (repository) => {
    const useCases = new OrderUseCase(repository);
    return useCases;
};
