'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserAppoinment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UserAppoinment.init({
    user_id: DataTypes.NUMBER,
    appointment_id: DataTypes.NUMBER
  }, {
    sequelize,
    modelName: 'UserAppoinment',
  });
  return UserAppoinment;
};