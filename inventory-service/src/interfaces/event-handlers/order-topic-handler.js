const useCases = require("../../application/use-cases");
const repositories = require("../../domain/repositories");
const OrderEventType = require('../../domain/enums/OrderEventType');

const repository = new repositories.ProductRepository();
const usecase = useCases.productUseCases(repository);

async function handle(message) {
    const type = message.type;
    delete message.type;
    switch (type) {
        case OrderEventType.ORDER_CREATED:
            await handleNewOrder(message);
            break;
        case OrderEventType.ORDER_CANCELLED:
            await handleCancelledOrder(message);
            break;

        default:
            break;
    }
}

async function handleNewOrder(message) {
    try {
        const product = await usecase.getById(message.order.productId);
        product.stock = product.stock - message.order.amount;
        await usecase.update(product.id, { stock: product.stock });

        console.log('Product stock updated');
    } catch (error) {
        console.error('Error handling new order:', error);
    }
}

async function handleCancelledOrder(message) {
    try {
        const product = await usecase.getById(message.order.productId);
        product.stock = product.stock + message.order.amount;
        await usecase.update(product.id, { stock: product.stock });

        console.log('Product stock updated');
    } catch (error) {
        console.error('Error handling new order:', error);
    }
}

module.exports = { handle };