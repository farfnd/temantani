const { fakerID_ID: faker } = require('@faker-js/faker');
const Sequelize = require('sequelize');
const ProjectStatus = require('../../src/domain/enums/ProjectStatus');
const axios = require('axios');
const config = require('../../src/support/config.js');

const generate = () => {
    return {
        status: faker.helpers.arrayElement(Object.values(ProjectStatus)),
        workerNeeds: faker.number.int({ min: 1, max: 10 }),
        description: faker.lorem.sentence(),
    };
};

const create = async (number = 1, attributes = {}) => {
    const models = [];

    for (let i = 0; i < number; i++) {
        const model = {
            ...generate(),
            ...attributes,
        };

        if (!model.landId) {
            const response = await axios.get(`${config.api.landService}/lands`)
            const data = response.data;

            const randomIndex = Math.floor(Math.random() * data.length);
            const randomId = data[randomIndex].id;

            model.landId = randomId;
        }

        models.push(model);
    }

    return models;
};


module.exports = {
    create,
};
