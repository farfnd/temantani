export default (repository) => {
    const useCases = {
        addCart: (body) => {
            return repository.addCart(body)
        },
        updateCart: (id, body) => {
            return repository.updateCart(id, body)
        },
        deleteCart: (id) => {
            return repository.deleteCart(id)
        },
        deleteUserCart: (userId) => {
            return repository.deleteUserCart(userId)
        },
        getUserCart: (userId) => {
            return repository.getUserCart(userId)
        },
        getCartById: (id) => {
            return repository.getCartById(id)
        }
    };

    return useCases;
}
