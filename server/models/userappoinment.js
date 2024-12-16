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
      UserAppoinment.belongsTo(models.User, { foreignKey: "user_id" });
      UserAppoinment.belongsTo(models.Appointment, { foreignKey: "appointment_id" });

    }
  }
  UserAppoinment.init({
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "user_id is required"
        }
      }
    },
    appointment_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "appointment_id is required"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'UserAppoinment',
  });
  return UserAppoinment;
};