'use strict';
const { create } = require('../factories/workerFactory');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const workers = await create(5);
    await queryInterface.bulkInsert('Workers', workers);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Workers', null, {});
  }
};
