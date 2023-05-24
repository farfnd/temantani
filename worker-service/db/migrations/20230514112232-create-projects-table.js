'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Projects', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      landId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Lands',
          key: 'id'
        }
      },
      status: {
        type: Sequelize.ENUM('fundraising', 'hiring', 'ongoing', 'finished', 'canceled'),
        allowNull: false,
        defaultValue: 'fundraising'
      },
      workerNeeds: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      description: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Projects');
  }
};