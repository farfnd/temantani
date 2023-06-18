const { Order, Address, User, Product } = require('../models');
const BaseRepository = require('./abstracts/base-repository');
const OrderCreated = require('../events/order-created');
const OrderPaid = require('../events/order-paid');
const OrderStatus = require("../enums/OrderStatus");
const ProductStatus = require("../enums/ProductStatus");
const errors = require('../../support/errors');
const OrderCancelled = require('../events/order-cancelled');

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
        const newStock = product.stock - data.amount;
        if(newStock < 0) {
            throw errors.BadRequest('Product stock is not enough');
        }
        
        await product.update({ stock: newStock });

        const createdOrder = await super.create(data, options);

        let order;
        try {
            order = await Order.findByPk(createdOrder.id, { include: ['address','user'] });
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
        if (orderStatus && OrderStatus.canTransition(order.orderStatus, orderStatus) === false) {
            throw errors.BadRequest('Order status cannot be changed');
        }

        await super.update(id, data, options);
        
        let orderEvent;
        if (orderStatus === OrderStatus.PAID) {
            orderEvent = new OrderPaid(order);
        } else if (orderStatus === OrderStatus.CANCELLED) {
            orderEvent = new OrderCancelled(order);
        }

        if (orderEvent && this.eventPublisher) {
            this.eventPublisher.publish(orderEvent);
        }
        return order;
    }
}

module.exports = OrderRepository;