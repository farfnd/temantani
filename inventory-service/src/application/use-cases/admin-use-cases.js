module.exports = (repository) => {
    const useCases = {
        getAllAdmins: () => {
            return repository.getAllAdmins()
        },
        getAdminById: (id) => {
            return repository.getAdminById(id)
        },
        createAdmin: (body) => {
            return repository.createAdmin(body)
        },
        updateAdmin: (id, body) => {
            return repository.updateAdmin(id, body)
        },
        deleteAdmin: (id) => {
            return repository.deleteAdmin(id)
        },
    };

    return useCases;
}