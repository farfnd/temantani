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
        autoIncrement: true,
        primaryKey: true
      },
      projectid: {
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
      status: {
        type: Sequelize.ENUM(Object.values(AcceptableStatus)),
        allowNull: false,
        defaultValue: AcceptableStatus.PENDING,
      },
      workContractUrl: {
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
              fields: ['projectId', 'farmerId']
          }
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('WorkOffers');
  }
};