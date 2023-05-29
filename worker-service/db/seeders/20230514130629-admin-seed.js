'use strict';
const { create } = require('../factories/adminFactory');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const admins = await create(5);
    await queryInterface.bulkInsert('Admins', admins);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Admins', null, {});
  }
};
