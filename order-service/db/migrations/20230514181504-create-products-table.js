'use strict';
const ProductStatus = require('../../src/domain/enums/ProductStatus');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Products', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
        allowNull: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      price: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      stock: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM(Object.values(ProductStatus)),
        allowNull: false,
        defaultValue: ProductStatus.AVAILABLE
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Products');
  }
};