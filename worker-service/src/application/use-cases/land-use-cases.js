module.exports = (repository) => {
    const useCases = {
        getAllLands: () => {
            return repository.getAllLands();
        },
        getLandById: (id) => {
            return repository.getLandById(id);
        },
        createLand: (body) => {
            return repository.createLand(body);
        },
        updateLand: (id, body) => {
            return repository.updateLand(id, body);
        },
        deleteLand: (id) => {
            return repository.deleteLand(id);
        },
        createLandFromMessage: async (message) => {
            try {
                const land = JSON.parse(message.value.toString());
                const { id, address } = land; // Extract only the relevant fields
                return repository.createLand({ id, address });
            } catch (error) {
                console.error('Error creating land from message:', error);
                throw error;
            }
        },
    };

    return useCases;
};
