const OrderEventType = require('../enums/OrderEventType');

class OrderCreated {
    constructor(order) {
        this.type = OrderEventType.ORDER_CREATED;
        this.order = order;
    }
}

module.exports = OrderCreated;
