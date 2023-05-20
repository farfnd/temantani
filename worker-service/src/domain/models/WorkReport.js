'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      //
    }
  }
  Project.init({
    projectId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Projects',
        key: 'id'
      },
      validate: { notNull: true, notEmpty: true, isInt: true, min: 1 }
    },
    farmerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Farmers',
        key: 'id'
      },
      validate: { notNull: true, notEmpty: true, isInt: true, min: 1 }
    },
    status: {
      type: DataTypes.ENUM('pending', 'accepted', 'rejected'),
      allowNull: false,
      defaultValue: 'pending',
      validate: { notNull: true, notEmpty: true, isIn: [['pending', 'accepted', 'rejected']] }
    },
    week: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    proof: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'Project',
    indexes: [
      {
        unique: true,
        fields: ['projectId', 'farmerId', 'week']
      }
    ]
  });
  return Project;
};