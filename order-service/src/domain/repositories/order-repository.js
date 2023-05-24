const { Order } = require('../models');
const BaseRepository = require('./abstracts/base-repository');

class OrderRepository extends BaseRepository {
    constructor() {
        super(Order);
    }
}

module.exports = new OrderRepository();
