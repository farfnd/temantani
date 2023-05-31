const ProductEventType = require('../enums/ProductEventType');

class ProductCreated {
    constructor(product) {
        this.type = ProductEventType.PRODUCT_CREATED;
        this.product = product;
    }
}

module.exports = ProductCreated;
