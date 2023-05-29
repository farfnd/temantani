const { Order, Address, User } = require('../models');
const BaseRepository = require('./abstracts/base-repository');
const OrderCreated = require('../events/order-created');
const OrderEventType = require("../enums/OrderEventType");

class OrderRepository extends BaseRepository {
    constructor(eventPublisher) {
        super(Order);
        this.eventPublisher = eventPublisher;
    }    

    async create(data, options = {}) {
        const { addressId, userId } = data;

        const address = await Address.findByPk(addressId);
        const user = await User.findByPk(userId);
        
        if (!user) {
            throw new Error('User not found');
        }

        if (!address) {
            throw new Error('Address not found');
        }
        
        const createdOrder = await super.create(data, options);

        let order;
        try {
            order = await Order.findByPk(createdOrder.id, { include: [Address, User] });
        } catch (error) {
            throw error;
        }
        
        // Publish the order created event
        const orderCreatedEvent = new OrderCreated(OrderEventType.ORDER_CREATED, order);
        this.eventPublisher.publish(orderCreatedEvent);

        return order;
    }
}

module.exports = OrderRepository;