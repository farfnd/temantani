const { Order, Address, User, Product } = require('../models');
const BaseRepository = require('./abstracts/base-repository');
const OrderCreated = require('../events/order-created');
const OrderPaid = require('../events/order-paid');
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
        let order = await Order.findByPk(id);

        if(!order) {
            throw errors.NotFound('Order not found');
        }

        const orderStatus = data.orderStatus;
        if (orderStatus && order.orderStatus !== OrderStatus.PENDING) {
            throw errors.BadRequest('Order status cannot be changed');
        }

        await super.update(id, data, options);
        
        if (orderStatus === OrderStatus.PAID && this.eventPublisher) {
            order = await Order.findByPk(id, { include: [Product, Address, User] });
            const orderEvent = new OrderPaid(order);
            this.eventPublisher.publish(orderEvent);
        }
    }
}

module.exports = OrderRepository;