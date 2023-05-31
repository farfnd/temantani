const ProductEventType = require('../enums/ProductEventType');
class ProductUpdated {
    constructor(product) {
        this.type = ProductEventType.PRODUCT_UPDATED;
        this.product = product;
    }
}

module.exports = ProductUpdated;
