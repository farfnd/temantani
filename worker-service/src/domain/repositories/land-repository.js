const { Land } = require('../models/index.js');

module.exports = () => {
    const repository = {
        getAllLands: () => {
            return Land.findAll();
        },
        getLandById: (id) => {
            return Land.findOne({ where: { id } });
        },
        createLand: (body) => {
            return Land.create(body);
        },
        updateLand: (id, body) => {
            return Land.update(body, { where: { id } });
        },
        deleteLand: async (id) => {
            return Land.destroy({ where: { id } });
        },
    };

    return repository;
};
