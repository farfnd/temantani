'use strict';
const { create } = require('../factories/addressFactory');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const addresses = await create(10);
    await queryInterface.bulkInsert('Addresses', addresses);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Addresses', null, {});
  }
};
