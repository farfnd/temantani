module.exports = (repository) => {
    const useCases = {
        getAllFarmers: () => {
            return repository.getAllFarmers();
        },
        getFarmerById: (id) => {
            return repository.getFarmerById(id);
        },
        createFarmer: (body) => {
            return repository.createFarmer(body);
        },
        updateFarmer: (id, body) => {
            return repository.updateFarmer(id, body);
        },
        deleteFarmer: (id) => {
            return repository.deleteFarmer(id);
        },
        createFarmerFromMessage: async (message) => {
            try {
                const newUser = JSON.parse(message.value.toString());
                const hasFarmerRole = newUser.roles.some(role => role === 'farmer');
                if (!hasFarmerRole) {
                    console.log('User does not have the farmer role');
                    return;
                }
                delete newUser.roles;
                return repository.createFarmer(newUser);
            } catch (error) {
                console.error('Error creating farmer from message:', error);
                throw error;
            }
        },
    };

    return useCases;
};
