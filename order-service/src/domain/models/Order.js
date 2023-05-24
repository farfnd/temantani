'use strict';
const {
  Model
} = require('sequelize');
const OrderStatus = require('../enums/OrderStatus');

module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      Order.belongsTo(models.User, { foreignKey: 'user_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
      Order.belongsTo(models.Address, { foreignKey: 'address_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
      Order.belongsTo(models.Product, { foreignKey: 'product_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
    }
  }

  Order.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    address_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    product_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    shipping_cost: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    order_status: {
      type: DataTypes.ENUM(Object.values(OrderStatus)),
      allowNull: false,
      defaultValue: OrderStatus.PENDING,
    },
    transaction_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    payment_method: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    payment_amount: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};