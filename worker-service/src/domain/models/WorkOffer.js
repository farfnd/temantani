'use strict';
const {
  Model
} = require('sequelize');
const AcceptableStatus = require('../enums/AcceptableStatus');

module.exports = (sequelize, DataTypes) => {
  class WorkOffer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      WorkOffer.belongsTo(models.Project, { foreignKey: 'projectId', as: 'project' });
      WorkOffer.belongsTo(models.Worker, { foreignKey: 'workerId', as: 'worker' });
      WorkOffer.belongsTo(models.Admin, { foreignKey: 'adminId', as: 'admin' });
    }
  }
  WorkOffer.init({
    projectId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Projects',
        key: 'id'
      },
      validate: { notNull: true, notEmpty: true, isInt: true, min: 1 }
    },
    workerId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Workers',
        key: 'id'
      },
      validate: { notNull: true, notEmpty: true, isInt: true, min: 1 }
    },
    adminId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Admins',
        key: 'id'
      },
      validate: { notNull: true, notEmpty: true, isInt: true, min: 1 }
    },
    status: {
      type: DataTypes.ENUM(Object.values(AcceptableStatus)),
      allowNull: false,
      defaultValue: AcceptableStatus.PENDING,
      validate: { notNull: true, notEmpty: true, isIn: [Object.values(AcceptableStatus)] }
    },
    workContractUrl: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: { notNull: false, notEmpty: true, isUrl: true }
    },
  }, {
    sequelize,
    modelName: 'WorkOffer',
    indexes: [
      {
        unique: true,
        fields: ['projectId', 'workerId']
      }
    ]
  });
  return WorkOffer;
};