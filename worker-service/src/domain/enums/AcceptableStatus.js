const AcceptableStatus = {
    PENDING: 'PENDING',
    ACCEPTED: 'ACCEPTED',
    REJECTED: 'REJECTED',
    canTransition: function (fromStatus, toStatus) {
        const allowedTransitions = {
            [this.PENDING]: [this.ACCEPTED, this.REJECTED],
            [this.ACCEPTED]: [this.PENDING],
            [this.REJECTED]: [this.PENDING],
        };

        return allowedTransitions[fromStatus].includes(toStatus);
    }
};

module.exports = AcceptableStatus;