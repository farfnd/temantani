'use strict';
const {
  Model
} = require('sequelize');
const ProductStatus = require('../enums/ProductStatus');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Product.hasMany(models.Order, {
        foreignKey: 'productId',
        as: 'orders',
      });
    }
  }
  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM(Object.values(ProductStatus)),
      allowNull: false,
      defaultValue: ProductStatus.AVAILABLE
    },
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};