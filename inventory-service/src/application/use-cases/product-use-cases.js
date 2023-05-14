module.exports = (repository) => {
    const useCases = {
        getAllProducts: () => {
            return repository.getAllProducts()
        },
        getProductById: (id) => {
            return repository.getProductById(id)
        },
        createProduct: (body) => {
            return repository.createProduct(body)
        },
        updateProduct: (id, body) => {
            return repository.updateProduct(id, body)
        },
        deleteProduct: (id) => {
            return repository.deleteProduct(id)
        },
    };

    return useCases;
}