const OrderStatus = {
    PENDING: 'PENDING',
    CANCELLED: 'CANCELLED',
    PAID: 'PAID',
    PROCESSED: 'PROCESSED',
    SENT: 'SENT',
    COMPLETED: 'COMPLETED',
    
    canTransition: function (fromStatus, toStatus) {
        const allowedTransitions = {
            [this.PENDING]: [this.PAID, this.CANCELLED],
            [this.CANCELLED]: [],
            [this.PAID]: [this.PROCESSED, this.CANCELLED],
            [this.PROCESSED]: [this.SENT, this.CANCELLED],
            [this.SENT]: [this.COMPLETED],
        };

        return allowedTransitions[fromStatus].includes(toStatus);
    }
};

module.exports = OrderStatus;