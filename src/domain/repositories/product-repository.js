import Product from '../models/Product.js';

export default () => {
    const repository = {
        getAllProducts: () => {
            return Product.findAll();
        },
        getProductById: (id) => {
            return Product.find({ id }).first();
        },
        createProduct: (body) => {
            return Product.create(body);
        },
        updateProduct: (id, body) => {
            return Product.update(id, body);
        },
        deleteProduct: (id) => {
            return Product.destroy(id);
        }
    };

    return repository;
};
