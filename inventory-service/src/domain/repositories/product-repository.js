const { Product } = require('../models/index.js');

module.exports = () => {
    const repository = {
        getAllProducts: async () => {
            return await Product.findAll();
        },
        getProductById: async (id) => {
            return await Product.findByPk(id);
        },
        createProduct: async (body) => {
            return await Product.create(body);
        },
        updateProduct: async (id, body) => {
            const product = await Product.findByPk(id);
            if (!product) {
                throw new Error(`Product with id ${id} not found`);
            }
            return await product.update(body);
        },
        deleteProduct: async (id) => {
            const product = await Product.findByPk(id);
            if (!product) {
                throw new Error(`Product with id ${id} not found`);
            }
            return await product.destroy();
        }
    };
    return repository;
};