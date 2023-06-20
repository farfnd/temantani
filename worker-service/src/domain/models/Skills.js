'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Skill extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        Skill.belongsToMany(models.Worker, {
            as: 'workers',
            foreignKey: 'skillId',
            through: 'WorkerSkills',
        });
    }
  }
  Skill.init({
    tag: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Skill',
  });
  return Skill;
};