const { fakerID_ID: faker } = require('@faker-js/faker');
const Sequelize = require('sequelize');
const { Land } = require('../../src/domain/models');
const ProjectStatus = require('../../src/domain/enums/ProjectStatus');

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
            const randomLand = await Land.findOne({
                order: [
                    Sequelize.fn('RANDOM'),
                ]
            });
            model.landId = randomLand.id;
        }

        models.push(model);
    }

    return models;
};


module.exports = {
    create,
};
