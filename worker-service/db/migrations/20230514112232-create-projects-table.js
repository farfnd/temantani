'use strict';
const ProjectStatus = require('../../src/domain/enums/ProjectStatus');
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
        type: Sequelize.ENUM(Object.values(ProjectStatus)),
        allowNull: false,
        defaultValue: ProjectStatus.FUNDRAISING
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