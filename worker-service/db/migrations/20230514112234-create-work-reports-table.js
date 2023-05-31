'use strict';
const AcceptableStatus = require('../../src/domain/enums/AcceptableStatus');
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('WorkReports', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
        allowNull: false,
        primaryKey: true
      },
      projectId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Projects',
          key: 'id'
        }
      },
      workerId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Workers',
          key: 'id'
        }
      },
      week: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      status: {
        type: Sequelize.ENUM(Object.keys(AcceptableStatus)),
        allowNull: false,
        defaultValue: AcceptableStatus.PENDING,
      },
      proof: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      verifierId: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'Admins',
          key: 'id'
        },
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
          actions_unique: {
              fields: ['projectId', 'workerId', 'week']
          }
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('WorkReports');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_WorkReports_status";');
  }
};