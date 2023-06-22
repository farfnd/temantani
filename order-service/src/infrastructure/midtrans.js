const config = require('../support/config');
const midtransClient = require('midtrans-client');
const moment = require('moment');
const crypto = require('crypto');

class MidtransService {
    constructor(distanceService) {
        this.distanceService = distanceService;
    }

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
            first_name: user.name,
            email: user.email,
            phone: user.phoneNumber
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
            first_name: address.name,
            address: address.address,
            city: address.city,
            postal_code: address.postalCode,
            phone: address.phoneNumber,
        };
    }

    async createTransactionToken(order) {
        try {
            const product = await order.getProduct();
            const user = await order.getUser();
            const address = await order.getAddress();

            const distance = await this.distanceService.getDistance(address);

            // Calculate the shipping cost
            const shippingCost = config.shippingCost.base
                + config.shippingCost.perKmUnder10Km * Math.ceil(distance / 1000)
                + (distance > 10000
                    ? config.shippingCost.perKmAbove10Km * Math.ceil((distance - 10000) / 1000)
                    : 0
                );

            // Update the order
            order.shippingCost = shippingCost;
            await order.save();

            let snap = new midtransClient.Snap({
                isProduction: config.env === 'production',
                serverKey: config.midtrans.serverKey
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
                    .then(async (transaction) => {
                        order.transactionToken = transaction.token;
                        await order.save();
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

    verifySignature(signatureKey, body) {
        const serverKey = config.midtrans.serverKey;
        const check = body.order_id + body.status_code + body.gross_amount + serverKey;

        return signatureKey === crypto.createHash('sha512').update(check).digest('hex');
    }
}

module.exports = MidtransService;
