const { WorkOffer } = require('../models/index.js');

module.exports = () => {
    const repository = {
        getAllWorkOffers: () => {
            return WorkOffer.findAll();
        },
        getWorkOfferById: (id) => {
            return WorkOffer.findOne({ where: { id } });
        },
        createWorkOffer: (body) => {
            return WorkOffer.create(body);
        },
        updateWorkOffer: (id, body) => {
            return WorkOffer.update(body, { where: { id } });
        },
        deleteWorkOffer: async (id) => {
            return WorkOffer.destroy({ where: { id } });
        },
    };

    return repository;
};
