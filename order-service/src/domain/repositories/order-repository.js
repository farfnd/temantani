const { Order, Address, User, Product } = require('../models');
const BaseRepository = require('./abstracts/base-repository');
const OrderCreated = require('../events/order-created');
const OrderPaid = require('../events/order-paid');
const OrderCancelled = require('../events/order-cancelled');
const OrderStatus = require("../enums/OrderStatus");
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
        
        await product.update({ stock: product.stock - data.amount });

        const createdOrder = await super.create(data, options);

        let order;
        try {
            order = await Order.findByPk(createdOrder.id, { include: [Address, User] });
        } catch (error) {
            throw error;
        }
        
        if (this.eventPublisher) {
            const orderCreatedEvent = new OrderCreated(order);
            this.eventPublisher.publish(orderCreatedEvent);
        }

        return order;
    }

    async update(id, data, options = {}) {
        await super.update(id, data, options);
        const status = data.status;

        let order;
        try {
            order = await Order.findByPk(id);
        } catch (error) {
            throw error;
        }
        
        let orderEvent;
        if (status === OrderStatus.PAID) {
            orderEvent = new OrderPaid(order);
        } else if (status === OrderStatus.CANCELLED) {
            orderEvent = new OrderCancelled(order);
        }

        if (orderEvent && this.eventPublisher) {
            this.eventPublisher.publish(orderEvent);
        }

        return order;
    }
}

module.exports = OrderRepository;