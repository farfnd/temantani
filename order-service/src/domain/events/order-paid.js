const OrderEventType = require('../enums/OrderEventType');

class OrderPaid {
    constructor(order) {
        this.type = OrderEventType.ORDER_PAID;
        this.order = order;
    }
}

module.exports = OrderPaid;
