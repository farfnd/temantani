const { Order, Address, User } = require('../models');
const BaseRepository = require('./abstracts/base-repository');

class OrderRepository extends BaseRepository {
    constructor() {
        super(Order);
    }

    async create(data, options = {}) {
        const { addressId, userId } = data;

        const address = await Address.findByPk(addressId);
        const user = await User.findByPk(userId);
        
        if (!user) {
            throw new Error('User not found');
        }

        if (!address) {
            throw new Error('Address not found');
        }
        
        return super.create(data, options);
    }
}

module.exports = new OrderRepository();
