const useCases = require("../../application/use-cases");
const repositories = require("../../domain/repositories");
const OrderEventType = require('../../domain/enums/OrderEventType');
const { generateInvoiceId } = require('../../support/helpers');

// Create instances of the repositories and use cases
const invoiceRepo = new repositories.InvoiceRepository();
const invoiceUseCase = useCases.invoiceUseCases(invoiceRepo);

async function handle(message) {
    const type = message.type;
    delete message.type;
    const order = message.order;
    switch (type) {
        case OrderEventType.ORDER_PAID:
            await createOrderInvoice(order);
            break;

        default:
            break;
    }
}

async function createOrderInvoice(order) {
    try {
        order.invoiceNumber = generateInvoiceId();
        console.log('Creating invoice from message:', order);

        const invoice = await invoiceUseCase.create(order);
        if (!invoice) {
            return;
        }
        console.log('New invoice created');
    } catch (error) {
        console.error('Error creating invoice from message:', error);
    }
}

module.exports = { handle };
