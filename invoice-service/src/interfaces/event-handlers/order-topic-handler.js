const useCases = require("../../application/use-cases");
const repositories = require("../../domain/repositories");
const OrderEventType = require('../../domain/enums/OrderEventType');

// Create instances of the repositories and use cases
const invoiceRepo = new repositories.InvoiceRepository();
const invoiceUseCase = useCases.invoiceUseCases(invoiceRepo);

async function handle(message) {
    const type = message.type;
    delete message.type;
    switch (type) {
        case OrderEventType.ORDER_PAID:
            await createOrderInvoice(message);
            break;

        case OrderEventType.ORDER_CANCELLED:
            await cancelOrderInvoice(message);
            break;

        default:
            break;
    }
}

async function createOrderInvoice(message) {
    try {
        const invoice = await invoiceUseCase.create(message);
        if (!invoice) {
            return;
        }
        console.log('New invoice created');
    } catch (error) {
        console.error('Error creating invoice from message:', error);
    }
}

async function cancelOrderInvoice(message) {
    try {
        message = validateMessage(message);
        const invoice = await invoiceUseCase.delete(message);
        console.log('Invoice cancelled');
    } catch (error) {
        console.error('Error cancelling invoice from message:', error); 
    }
}

module.exports = { handle };
