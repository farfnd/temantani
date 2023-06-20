const { fakerID_ID: faker } = require('@faker-js/faker');
const Sequelize = require('sequelize');
const { User } = require('../../src/domain/models');

const generate = () => {
    return {
        street: faker.location.streetAddress(),
        city: faker.location.city(),
        postalCode: faker.location.zipCode(),
    };
};

const create = async (number = 1, attributes = {}) => {
    const models = [];

    for (let i = 0; i < number; i++) {
        const model = {
            ...generate(),
            ...attributes,
        };
        

        if (!model.ownerId) {
            const randomUser = await User.findOne({
                order: [
                    Sequelize.fn('RANDOM'),
                ]
            });
            model.ownerId = randomUser.id;
        }

        models.push(model);
    }

    return models;
};

module.exports = {
    create,
};
