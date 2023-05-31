const OrderEventType = require('../enums/OrderEventType');

class OrderCancelled {
    constructor(order) {
        this.type = OrderEventType.ORDER_CANCELLED;
        this.order = order;
    }
}

module.exports = OrderCancelled;
