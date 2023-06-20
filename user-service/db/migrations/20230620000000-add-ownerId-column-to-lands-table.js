'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Lands', 'ownerId', {
      type: Sequelize.UUID,
      allowNull: true,
      references: {
        model: 'Users',
        key: 'id'
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Lands', 'ownerId');
  }
};