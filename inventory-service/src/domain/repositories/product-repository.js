const { Product } = require('../models');
const BaseRepository = require('./abstracts/base-repository');
const ProductCreated = require('../events/product-created');
const ProductUpdated = require('../events/product-updated');

class ProductRepository extends BaseRepository {
    constructor(eventPublisher) {
        super(Product);
        this.eventPublisher = eventPublisher;
    }

    async create(data, options = {}) {
        const createdProduct = await super.create(data, options);

        let product;
        try {
            product = await Product.findByPk(createdProduct.id);
        } catch (error) {
            throw error;
        }

        // Publish the product created event
        const productCreatedEvent = new ProductCreated(product);
        this.eventPublisher.publish(productCreatedEvent);

        return product;
    }

    async update(id, data, options = {}) {
        await super.update(id, data, options);

        let product;
        try {
            product = await Product.findByPk(id);
        } catch (error) {
            throw error;
        }

        if (this.eventPublisher) {
            const productUpdatedEvent = new ProductUpdated(product);
            this.eventPublisher.publish(productUpdatedEvent);
        }

        return product;
    }
}

module.exports = ProductRepository;
