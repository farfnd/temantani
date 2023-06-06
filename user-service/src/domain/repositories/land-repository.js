const { Land } = require('../models');

module.exports = () => {
    const repository = {
        getAllLands: () => {
            return Land.findAll();
        },
        getLandById: async (id) => {
            const land = await Land.findByPk(id);
            if (!land) {
                throw new Error(`Land with id ${id} not found`);
            }
            return land;
        },
        createLand: (body) => {
            return Land.create(body);
        },
        updateLand: (id, body) => {
            return Land.update(body, {
                where: { id },
            });
        },
        deleteLand: async (id) => {
            await LandRoles.destroy({
                where: { landId: id },
            });
            return Land.destroy({
                where: { id },
            });
        },
    };

    return repository;
};
