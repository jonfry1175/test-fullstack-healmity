'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Appointment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Appointment.belongsTo(models.User, { foreignKey: "creator_id" });
    }
  }
  Appointment.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "title is required"
        }
      }
    },
    creator_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "creator_id is required"
        }
      }
    },
    start: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: {
          msg: "start is required"
        }
      }
    },
    end: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: {
          msg: "end date is required"
        }
      }
    },
  }, {
    sequelize,
    modelName: 'Appointment',
  });
  return Appointment;
};