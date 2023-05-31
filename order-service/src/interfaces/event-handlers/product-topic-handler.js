const useCases = require("../../application/use-cases");
const repositories = require("../../domain/repositories");
const ProductEventType = require('../../domain/enums/ProductEventType');

const repository = new repositories.ProductRepository();
const usecase = useCases.productUseCases(repository);

async function handle(message) {
    const type = message.type;
    delete message.type;
    const product = message.product
    switch (type) {
        case ProductEventType.PRODUCT_CREATED:
            await handleNewProduct(product);
            break;
        case ProductEventType.PRODUCT_UPDATED:
            await handleUpdateProduct(product);
            break;
    
        default:
            break;
    }
}

async function handleNewProduct(product) {
    try {
        const createdProduct = await usecase.create({
            id: product.id,
            ...product,
        });
        if (!createdProduct) {
            return;
        }
        console.log('New product created');
    } catch (error) {
        console.error('Error creating product from message:', error);
    }
};

async function handleUpdateProduct(product) {
    try {
        const productId = product.id;
        delete product.id;
        const updatedProduct = await usecase.update(productId, product);
        if (!updatedProduct) {
            return;
        }
        console.log('Product updated');
    } catch (error) {
        console.error('Error updating product from message:', error);
    }
};

module.exports = { handle };