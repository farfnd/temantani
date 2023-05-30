'use strict';
const { create } = require('../factories/landFactory');

/** @type {import('sequelize-cli').Migration} */

const table = 'Lands';

module.exports = {
  async up (queryInterface, Sequelize) {
    const data = await create(5);
    await queryInterface.bulkInsert(table, data);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete(table, null, {});
  }
};
