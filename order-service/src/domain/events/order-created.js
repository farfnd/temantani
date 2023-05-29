class OrderCreated {
    constructor(type, order) {
        this.type = type;
        this.order = order;
        this.address = order.Address;
        this.user = order.User;
        
        delete this.order.Address;
        delete this.order.User;
    }
}

module.exports = OrderCreated;
