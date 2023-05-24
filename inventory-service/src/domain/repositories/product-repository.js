const { Product } = require('../models');
const BaseRepository = require('./abstracts/base-repository');

class ProductRepository extends BaseRepository {
    constructor() {
        super(Product);
    }
}

module.exports = new ProductRepository();
