'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Appointment, { foreignKey: "creator_id" });
      User.belongsToMany(models.Appointment, { through: models.UserAppoinment, foreignKey: "user_id" });
      // User.belongsToMany(models.Appointment, {
      //   through: models.UserAppointment,
      //   foreignKey: "user_id",
      //   otherKey: "appointment_id",
      //   as: "appointments",
      // });
    }
  }
  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Name is required"
        }
      }
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          msg: "Username is required"
        }
      },
    },
    preferred_timezone: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "preferred_timezone is required"
        }
      }
    },
  },
    {
      sequelize,
      modelName: 'User',
    });
  User.beforeCreate(async (user, options) => {
    const existsUsername = await User.findOne({ where: { username: user.username } });
    if (existsUsername) {
      throw new Error('Username already exists');
    }
  })
  return User;
};