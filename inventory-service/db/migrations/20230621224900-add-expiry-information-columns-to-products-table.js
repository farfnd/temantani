'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Products', 'expiryPeriod', {
      type: Sequelize.INTEGER,
      allowNull: true
    });
    await queryInterface.addColumn('Products', 'expiryPeriodUnit', {
      type: Sequelize.STRING,
      allowNull: true
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Products', 'expiryPeriod');
    await queryInterface.removeColumn('Products', 'expiryPeriodUnit');
  }
};