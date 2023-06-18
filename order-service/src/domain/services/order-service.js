const { Order } = require('../models');
const moment = require('moment');
const config = require('../../support/config');
const errors = require('../../support/errors');
const OrderStatus = require('../enums/OrderStatus');

class OrderService {
    static async verifyOrderExists(orderId) {
        const order = await Order.findByPk(orderId);
        if (!order) {
            console.log("Order does not exist");
            throw errors.BadRequest("Order does not exist");
        }

        return true;
    }

    static async isTransitionAllowed(id, status) {
        const order = await Order.findByPk(id);
        if (status && OrderStatus.canTransition(order.status, status) === false) {
            throw errors.BadRequest("Order status transition is not allowed");
        }

        return true;
    }

    static async isOrderNotExpired(orderId) {
        const order = await Order.findByPk(orderId);

        const currentTime = moment();
        const expiryTime = moment(order.createdAt).add(config.midtrans.expiry.duration, config.midtrans.expiry.unit);

        if (currentTime.isAfter(expiryTime)) {
            throw errors.BadRequest('Order payment is expired');
        }
    }
}

module.exports = OrderService;
