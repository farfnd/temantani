'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.renameColumn('Orders', 'orderStatus', 'status');
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.renameColumn('Orders', 'status', 'orderStatus');
  }
};