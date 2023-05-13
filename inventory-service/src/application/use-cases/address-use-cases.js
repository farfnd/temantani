export default (repository) => {
    const useCases = {
        getAllAddressByUserId: (userId) => {
            return repository.getAddress({ user_id: userId })
        },
        getAddressById: (id) => {
            return repository.getAddressById(id)
        },
        createAddress: (body) => {
            return repository.createAddress(body)
        },
        updateAddress: (id, body) => {
            return repository.updateAddress(id, body)
        },
        deleteAddress: (id) => {
            return repository.deleteAddress(id)
        }
    };

    return useCases;
}
