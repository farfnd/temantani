const { fakerID_ID: faker } = require('@faker-js/faker');
const WorkAvailability = require('../../src/domain/enums/WorkAvailability');

const generate = () => {
    return {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        workAvailability: WorkAvailability.AVAILABLE,
    };
};

const create = async (number = 1, attributes = {}) => {
    const models = [];

    for (let i = 0; i < number; i++) {
        const model = {
            ...generate(),
            ...attributes,
        };

        models.push(model);
    }

    return models;
};

module.exports = {
    create,
};
