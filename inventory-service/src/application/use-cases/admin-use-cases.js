const { toLower } = require("lodash");
const AdminRole = require("../../domain/enums/InventoryAdminRole");

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
                const adminRoles = Object.values(AdminRole);
                
                const userRoles = message.roles.split(','); // Split the roles string into an array
                const hasAdminRole = userRoles.some(role => adminRoles.includes(role.trim()));

                if (!hasAdminRole) {
                    console.log('User does not have a valid admin role');
                    return;
                }
                delete message.roles;
                return repository.createAdmin(message);
            } catch (error) {
                console.error('Error creating admin from message:', error);
                throw error;
            }
        },
    };

    return useCases;
}