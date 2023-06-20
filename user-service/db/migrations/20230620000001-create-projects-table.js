'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Projects', {
      id: {
        allowNull: false,
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
        primaryKey: true,
      },
      landId: {
        allowNull: false,
        type: Sequelize.UUID
      },
      description: {
        allowNull: true,
        type: Sequelize.STRING
      },
      status: {
        allowNull: false,
        type: Sequelize.STRING
      },
      workerNeeds: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      fundraisingDeadline: {
        allowNull: true,
        type: Sequelize.DATE
      },
      estimatedFinished: {
        allowNull: true,
        type: Sequelize.DATE
      },
      initiatedAt: {
        allowNull: true,
        type: Sequelize.DATE
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Projects');
  }
};
