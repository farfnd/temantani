export default (repository) => {
    const useCases = {
        getAllUsers: () => {
            return repository.getAllUsers()
        },
        getUserById: (id) => {
            return repository.getUserById(id)
        },
        createUser: (body) => {
            return repository.createUser(body)
        },
        updateUser: (id, body) => {
            return repository.updateUser(id, body)
        },
        deleteUser: (id) => {
            return repository.deleteUser(id)
        },
    };

    return useCases;
}