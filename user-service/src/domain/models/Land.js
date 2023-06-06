'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Land extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      //
    }
  }
  Land.init({
    street: {
      type: DataTypes.STRING
    },
    city: {
      type: DataTypes.STRING
    },
    postalCode: {
      type: DataTypes.STRING
    },
  }, {
    sequelize,
    modelName: 'Land',
    timestamps: false,
  });
  return Land;
};