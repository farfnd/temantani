export default (repository) => {
    const useCases = {
        checkout: (body) => {
            return repository.checkout(body)
        },
        getAllOrdersByUserId: (userId) => {
            return repository.getAllOrdersByUserId(userId)
        },
        // updateCarts: (id,body)=>{
        //     return repository.updateCarts(id,body)
        // },
        // deleteCarts: (id)=>{
        //     return repository.deleteCarts(id)
        // },
        // deleteAllCarts: (userId)=>{
        //     return repository.deleteAllCarts(userId)
        // },
        // getCartsById: (id)=>{
        //     return repository.getCartsById(id)
        // },
    };

    return useCases;
}