'use strict';
const {
  Model
} = require('sequelize');
const OrderStatus = require('../enums/OrderStatus');

module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      Order.belongsTo(models.User, { foreignKey: 'userId', onDelete: 'CASCADE', onUpdate: 'CASCADE', as: 'user' });
      Order.belongsTo(models.Address, { foreignKey: 'addressId', onDelete: 'CASCADE', onUpdate: 'CASCADE', as: 'address' });
      Order.belongsTo(models.Product, { foreignKey: 'productId', onDelete: 'CASCADE', onUpdate: 'CASCADE', as: 'product' });
    }
  }

  Order.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    addressId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    productId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    shippingCost: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    orderStatus: {
      type: DataTypes.ENUM(Object.values(OrderStatus)),
      allowNull: true,
      defaultValue: OrderStatus.PENDING,
    },
    transactionId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    paymentMethod: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    paymentAmount: {
      type: DataTypes.INTEGER,
      allowNull: true,
    }
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};