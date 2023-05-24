const { fakerID_ID } = require('@faker-js/faker');
const ProductStatus = require('../../src/domain/enums/ProductStatus');

const generate = () => {
    return {
        name: faker.commerce.product(),
        price: faker.commerce.price({ min: 10000, max: 30000, dec: 0 }),
        stock: faker.number.int({ min: 10, max: 100 }),
        status: faker.helpers.arrayElement(Object.values(ProductStatus)),
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
