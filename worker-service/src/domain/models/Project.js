'use strict';
const {
  Model
} = require('sequelize');
const ProjectStatus = require('../enums/ProjectStatus');

module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Project.hasMany(models.WorkOffer, {
        foreignKey: 'projectId',
        as: 'workOffers'
      });
      Project.hasMany(models.WorkReport, {
        foreignKey: 'projectId',
        as: 'workReports'
      });
    }
  }
  Project.init({
    landId: {
      type: DataTypes.INTEGER,
    },
    status: {
      type: DataTypes.ENUM(Object.values(ProjectStatus)),
      allowNull: false,
      defaultValue: ProjectStatus.FUNDRAISING
    },
    workerNeeds: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    description: {
      type: DataTypes.STRING,
    },
  }, {
    sequelize,
    modelName: 'Project',
  });
  return Project;
};