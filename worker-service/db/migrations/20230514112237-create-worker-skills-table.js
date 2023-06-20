'use strict';
const AcceptableStatus = require('../../src/domain/enums/AcceptableStatus');
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('WorkerSkills', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      workerId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Workers',
          key: 'id'
        }
      },
      skillId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Skills',
          key: 'id'
        }
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
    }, {
      uniqueKeys: {
        uniqueWorkerSkill: {
          fields: ['workerId', 'skillId']
        }
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('WorkerSkills');
  }
};