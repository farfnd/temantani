'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Invoices', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
        allowNull: false,
        primaryKey: true,
      },
      invoiceNumber: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      orderId: {
        type: Sequelize.UUID,
        allowNull: false
      },
      transactionId: {
        type: Sequelize.UUID,
        allowNull: false
      },
      paymentMethod: {
        type: Sequelize.STRING
      },
      paymentAmount: {
        type: Sequelize.INTEGER
      },
      orderDetails: {
        type: Sequelize.JSON
      },
      shippingDetails: {  
        type: Sequelize.JSON
      },
      customerDetails: {
        type: Sequelize.JSON
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
      },
      deletedAt: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: null
      }
    }, {
      uniqueKeys: {
          actions_unique: {
              fields: ['invoiceNumber', 'orderId', 'transactionId']
          }
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Invoices');
  }
};