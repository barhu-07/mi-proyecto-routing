'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TempRequestLogCheck extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  TempRequestLogCheck.init({
    method: DataTypes.STRING,
    path: DataTypes.STRING,
    ip: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'TempRequestLogCheck',
  });
  return TempRequestLogCheck;
};