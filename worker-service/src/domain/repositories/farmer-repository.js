const { Farmer } = require('../models/index.js');

module.exports = () => {
    const repository = {
        getAllFarmers: () => {
            return Farmer.findAll();
        },
        getFarmerById: (id) => {
            return Farmer.findOne({ where: { id } });
        },
        createFarmer: (body) => {
            return Farmer.create(body);
        },
        updateFarmer: (id, body) => {
            return Farmer.update(body, { where: { id } });
        },
        deleteFarmer: async (id) => {
            return Farmer.destroy({ where: { id } });
        },
    };

    return repository;
};
