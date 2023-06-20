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
    landId: {
      allowNull: false,
      type: DataTypes.UUID
    },
    description: {
      allowNull: true,
      type: DataTypes.STRING
    },
    status: {
      allowNull: false,
      type: DataTypes.STRING
    },
    workerNeeds: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    fundraisingDeadline: {
      allowNull: true,
      type: DataTypes.DATE
    },
    estimatedFinished: {
      allowNull: true,
      type: DataTypes.DATE
    },
    initiatedAt: {
      allowNull: true,
      type: DataTypes.DATE
    }
  }, {
    sequelize,
    modelName: 'Project',
  });
  return Project;
};