const config = require('../support/config');
const midtransClient = require('midtrans-client');
const moment = require('moment');
const DistanceService = require('./distance');

class MidtransService {
    createItemDetails(product, order) {
        return [{
            id: product.id,
            price: product.price,
            quantity: order.amount,
            name: product.name
        }];
    }

    createCustomerDetails(user) {
        return {
            firstName: user.name,
            email: user.email,
            phoneNumber: user.phoneNumber
        };
    }

    createShippingFeeItem(order) {
        return [{
            id: "shipping-fee",
            price: order.shippingCost,
            quantity: 1,
            name: "Shipping Fee",
        }];
    }

    createShippingAddress(address) {
        return {
            firstName: address.name,
            address: address.address,
            city: address.city,
            postalCode: address.postalCode,
            phone: address.phoneNumber,
        };
    }

    async createTransactionToken(order) {
        try {
            const product = await order.getProduct();
            const user = await order.getUser();
            const address = await order.getAddress();

            // Calculate the distance
            const distanceService = new DistanceService(address);
            const distance = await distanceService.getDistance(); // in meter

            // Calculate the shipping cost
            const shippingCost = config.shippingCost.base
                + config.shippingCost.perKmUnder10Km * Math.ceil(distance / 1000)
                + (distance > 10000
                    ? config.shippingCost.perKmAbove10Km * Math.ceil((distance - 10000) / 1000)
                    : 0
                );

            // Update the order
            order.shippingCost = shippingCost;
            
            let snap = new midtransClient.Snap({
                isProduction : config.env === 'production',
                serverKey : config.midtrans.serverKey
            });

            let parameter = {
                transaction_details: {
                    order_id: order.id,
                    gross_amount: order.shippingCost + product.price * order.amount
                },
                credit_card: {
                    secure: true
                },
                customer_details: {
                    ...this.createCustomerDetails(user),
                    shipping_address: this.createShippingAddress(address)
                },
                item_details: [
                    ...this.createItemDetails(product, order),
                    ...this.createShippingFeeItem(order)
                ],
                expiry: {
                    start_time: moment(order.createdAt).format('YYYY-MM-DD HH:mm:ss Z'),
                    unit: config.midtrans.expiry.unit,
                    duration: config.midtrans.expiry.duration
                }
            };

            return new Promise((resolve, reject) => {
                snap.createTransaction(parameter)
                    .then((transaction) => {
                        resolve(transaction);
                    })
                    .catch((e) => {
                        console.log(e);
                        reject(new Error(`Failed to create transaction: ${e.message}`));
                    });
            });
            
        } catch (error) {
            throw new Error(`Failed to create transaction: ${error.message}`);
        }
    }
}

module.exports = MidtransService;
