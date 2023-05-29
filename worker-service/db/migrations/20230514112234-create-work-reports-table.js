'use strict';
const AcceptableStatus = require('../../src/domain/enums/AcceptableStatus');
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('WorkOffers', {
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
      farmerid: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Farmers',
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
        type: Sequelize.ENUM(Object.values(AcceptableStatus)),
        allowNull: false,
        defaultValue: AcceptableStatus.PENDING,
        validate: { notNull: true, notEmpty: true, isIn: [Object.values(AcceptableStatus)] }
      },
      proof: {
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
    }, {
      uniqueKeys: {
          actions_unique: {
              fields: ['projectId', 'farmerId', 'week']
          }
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('WorkOffers');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_WorkOffers_status";');
  }
};