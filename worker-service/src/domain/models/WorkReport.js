'use strict';
const {
  Model
} = require('sequelize');
const AcceptableStatus = require('../enums/AcceptableStatus');

module.exports = (sequelize, DataTypes) => {
  class WorkReport extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      WorkReport.belongsTo(models.Project, { foreignKey: 'projectId', as: 'project' });
      WorkReport.belongsTo(models.Worker, { foreignKey: 'workerId', as: 'worker' });
      WorkReport.belongsTo(models.Admin, { foreignKey: 'verifierId', as: 'verifier' });
    }
  }
  WorkReport.init({
    projectId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Projects',
        key: 'id'
      },
      validate: { notNull: true, notEmpty: true, isUUID: 4 }
    },
    workerId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Workers',
        key: 'id'
      },
      validate: { notNull: true, notEmpty: true, isUUID: 4 }
    },
    status: {
      type: DataTypes.ENUM(Object.values(AcceptableStatus)),
      allowNull: true,
      defaultValue: AcceptableStatus.PENDING,
    },
    week: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    proof: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    verifierId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'Admins',
        key: 'id'
      },
      validate: { isUUID: 4 }
    },
  }, {
    sequelize,
    modelName: 'WorkReport',
    indexes: [
      {
        unique: true,
        fields: ['projectId', 'workerId', 'week']
      }
    ]
  });
  return WorkReport;
};