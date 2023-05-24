'use strict';
const { create } = require('../factories/userFactory');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const users = await create(10);
    await queryInterface.bulkInsert('Users', users);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
