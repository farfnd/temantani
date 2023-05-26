const AbstractUseCase = require('./abstracts/base-use-cases');
const OrderStatus = require('../../domain/enums/OrderStatus');

class OrderUseCase extends AbstractUseCase {
    constructor(repository) {
        super(repository);
    }
    
    async updatePaymentStatus(orderId, transactionId, statusCode, grossAmount, paymentType) {
        const statusCodeMapping = {
            '200': OrderStatus.PAID,
            '201': OrderStatus.PENDING,
        };

        const orderStatus = statusCodeMapping[statusCode] || OrderStatus.CANCELLED;

        try {
            // Update the order status in the database
            await this.repository.update(orderId, {
                transactionId,
                orderStatus,
                paymentMethod: paymentType,
                paymentAmount: grossAmount
            });
        } catch (error) {
            console.log(error);
            throw new Error('Failed to update order status');
        }
    }
}

module.exports = (repository) => {
    const useCases = new OrderUseCase(repository);
    return useCases;
};
