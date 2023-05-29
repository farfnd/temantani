'use strict';
const { create } = require('../factories/productFactory');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const products = await create(10);
    await queryInterface.bulkInsert('Products', products);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Products', null, {});
  }
};
