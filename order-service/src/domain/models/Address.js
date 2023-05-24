'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {

  class Address extends Model {
    static associate(models) {
      Address.belongsTo(models.User, { foreignKey: 'userId', onDelete: 'SET NULL', onUpdate: 'CASCADE' });
    }
  }

  Address.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    subdistrict: {
      type: DataTypes.STRING,
      allowNull: false
    },
    district: {
      type: DataTypes.STRING,
      allowNull: false
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false
    },
    note: {
      type: DataTypes.STRING,
      allowNull: true
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW
    }
  }, {
    sequelize,
    modelName: 'Address',
  });
  
  return Address;
};