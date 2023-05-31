const { Order, Address, User, Product } = require('../models');
const BaseRepository = require('./abstracts/base-repository');
const OrderCreated = require('../events/order-created');
const OrderEventType = require("../enums/OrderEventType");
const ProductStatus = require("../enums/ProductStatus");
const errors = require('../../support/errors');

class OrderRepository extends BaseRepository {
    constructor(eventPublisher) {
        super(Order);
        this.eventPublisher = eventPublisher;
    }    

    async create(data, options = {}) {
        const { addressId, userId, productId } = data;
        
        const user = await User.findByPk(userId);
        if (!user) {
            throw errors.BadRequest('User not found');
        }
        
        const address = await Address.findByPk(addressId);
        if (!address) {
            throw errors.BadRequest('Address not found');
        }

        const product = await Product.findByPk(productId);
        if (!product) {
            throw errors.BadRequest('Product not found');
        }
        if(product.status === ProductStatus.NA) {
            throw errors.BadRequest('Product not available for sale');
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