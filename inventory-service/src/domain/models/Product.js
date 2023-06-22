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
      // define association here
    }
  }
  Product.init({

    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        notNull: true,
        len: [3, 50]
      }
    },
    description: {
      type: DataTypes.TEXT
    },
    price: {
      type: DataTypes.INTEGER
    },
    stock: {
      type: DataTypes.INTEGER
    },
    status: {
      type: DataTypes.ENUM(Object.values(ProductStatus)),
      allowNull: false,
      defaultValue: ProductStatus.AVAILABLE,
      validate: { notNull: true, notEmpty: true, isIn: [Object.values(ProductStatus)] }
    },
    preOrderEstimatedStock: {
      type: DataTypes.INTEGER,
    },
    preOrderEstimatedDate: {
      type: DataTypes.DATE,
    },
    image: {
      type: DataTypes.STRING,
    },
    expiryPeriod: {
      type: DataTypes.INTEGER,
    },
    expiryPeriodUnit: {
      type: DataTypes.STRING,
    },
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};