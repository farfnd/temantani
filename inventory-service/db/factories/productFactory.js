const { fakerID_ID: faker } = require('@faker-js/faker');
const ProductStatus = require('../../src/domain/enums/ProductStatus');
const { v4: uuidv4 } = require('uuid');

const generate = () => {
    let status = faker.helpers.arrayElement(Object.values(ProductStatus));
    return {
        id: uuidv4(),
        name: faker.commerce.product(),
        description: faker.lorem.sentence(),
        price: faker.commerce.price({ min: 10000, max: 30000, dec: 0 }),
        stock: faker.number.int({ min: 10, max: 100 }),
        status: status,
        preOrderEstimatedStock: status === ProductStatus.PREORDER ? faker.number.int({ min: 10, max: 100 }) : null,
        preOrderEstimatedDate:  status === ProductStatus.PREORDER ? faker.date.future() : null,
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
