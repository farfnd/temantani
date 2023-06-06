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
    };

    return useCases;
};
