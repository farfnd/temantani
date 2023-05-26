const { fakerID_ID: faker } = require('@faker-js/faker');
const Sequelize = require('sequelize');
const { User } = require('../../src/domain/models'); // Replace with your actual User model

const generate = () => {
    return {
        name: faker.person.fullName(),
        address: faker.location.streetAddress(),
        subdistrict: faker.location.county(),
        district: faker.location.state(),
        city: faker.location.city(),
        phoneNumber: faker.phone.number(),
        postalCode: faker.location.zipCode(),
        note: faker.lorem.sentence(),
        createdAt: new Date(),
        updatedAt: new Date(),
    };
};

const create = async (number = 1, attributes = {}) => {
    const models = [];

    for (let i = 0; i < number; i++) {
        const model = {
            ...generate(),
            ...attributes,
        };

        if (!model.userId) {
            const randomUser = await User.findOne({
                order: [
                    Sequelize.fn('RANDOM'),
                ]
            });
            model.userId = randomUser.id;
        }

        models.push(model);
    }

    return models;
};

module.exports = {
    create,
};
