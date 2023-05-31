'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Invoice extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      //
    }
  }
  Invoice.init({
    orderId: {
      type: DataTypes.UUID
    },
    transactionId: {
      type: DataTypes.UUID
    },
    invoiceNumber: {
      type: DataTypes.STRING
    },
    paymentMethod: {
      type: DataTypes.STRING
    },
    paymentAmount: {
      type: DataTypes.INTEGER
    },
    orderDetails: {
      type: DataTypes.JSON
    },
    shippingDetails: {  
      type: DataTypes.JSON
    },
    customerDetails: {
      type: DataTypes.JSON
    },
  }, {
    sequelize,
    modelName: 'Invoice',
    paranoid: true,
  });
  return Invoice;
};