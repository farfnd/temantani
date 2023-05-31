const OrderEventType = require('../enums/OrderEventType');

class OrderPaid {
    constructor(order) {
        this.type = OrderEventType.ORDER_PAID;
        this.order = {
            orderId: order.id,
            transactionId: order.transactionId,
            paymentMethod: order.paymentMethod,
            paymentAmount: order.paymentAmount,
            orderDetails: [
                ...this.createItemDetails(order.Product, order),
                ...this.createShippingFeeItem(order)
            ],
            customerDetails: {
                ...this.createCustomerDetails(order.User),
            },
            shippingDetails: this.createShippingAddress(order.Address),
        };
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
}

module.exports = OrderPaid;
