'use strict';
const {
  Model
} = require('sequelize');
const WorkAvailability = require('../enums/WorkAvailability');

module.exports = (sequelize, DataTypes) => {
  class Worker extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        Worker.hasMany(models.WorkOffer, {
            as: 'workOffers',
            foreignKey: 'workerId',
        });
        Worker.hasMany(models.WorkReport, {
            as: 'workReports',
            foreignKey: 'workerId',
        });
        Worker.belongsToMany(models.Skill, {
            as: 'skills',
            foreignKey: 'workerId',
            through: 'WorkerSkills',
        });
    }
  }
  Worker.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    workAvailability: {
      type: DataTypes.ENUM(Object.values(WorkAvailability)),
      allowNull: false,
      defaultValue: WorkAvailability.AVAILABLE
    },
    description: {
      type: DataTypes.STRING,
    }
  }, {
    sequelize,
    modelName: 'Worker',
  });
  return Worker;
};