const moment = require('moment');
const { Order } = require('../../../domain/models');
const OrderStatus = require('../../../domain/enums/OrderStatus');
const config = require('../../../support/config');

async function cancelExpiredOrders() {
    const currentTime = moment();

    try {
        const orders = await Order.findAll({ where: { status: OrderStatus.PENDING } });

        for (const order of orders) {
            const expiryTime = moment(order.createdAt).add(config.midtrans.expiry.duration, config.midtrans.expiry.unit);

            if (currentTime.isAfter(expiryTime)) {
                order.status = OrderStatus.CANCELLED;
                try {
                    await order.save();
                    console.log(`Order ${order.id} cancelled.`);
                } catch (err) {
                    console.error('Error cancelling order:', err);
                }
            }
        }
    } catch (err) {
        console.error('Error retrieving orders:', err);
    }
}

module.exports = cancelExpiredOrders;
