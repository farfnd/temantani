const { fakerID_ID: faker } = require('@faker-js/faker');

const generate = () => {
    return {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        phoneNumber: faker.phone.number(),
        street: faker.location.streetAddress(),
        city: faker.location.city(),
        postalCode: faker.location.zipCode(),
        profilePictureUrl: faker.internet.avatar(),
        bank: faker.helpers.arrayElement(['BNI', 'BRI', 'Mandiri', 'BCA']),
        bankAccountNumber: faker.finance.accountNumber(),
        bankAccountHolderName: faker.person.fullName(),
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
