const { toLower } = require("lodash");

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
        createAdminFromMessage: async (message) => {
            try {
                const newUser = JSON.parse(message.value.toString());
                console.log("masuk")
                const adminRoles = ['admin_store', 'admin_super'];
                const hasAdminRole = newUser.roles.some(role => adminRoles.includes(toLower(role)));
                if (!hasAdminRole) {
                    console.log('User does not have the store admin role');
                    return;
                }
                delete newUser.roles;
                console.log("masuk2")
                return repository.createAdmin(newUser);
            } catch (error) {
                console.error('Error creating admin from message:', error);
                throw error;
            }
        },
    };

    return useCases;
}