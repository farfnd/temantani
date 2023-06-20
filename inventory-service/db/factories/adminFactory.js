const { fakerID_ID: faker } = require('@faker-js/faker');
const { v4: uuidv4 } = require('uuid');

const generate = () => {
    return {
        id: uuidv4(),
        name: faker.person.fullName(),
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
