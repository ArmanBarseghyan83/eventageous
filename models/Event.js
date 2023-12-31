const sequelize = require('../config/connection');
const { Model, DataTypes } = require('sequelize');

class Event extends Model {}

Event.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    }, 
    zipcode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bufferData: {
      type: DataTypes.BLOB('medium'),
    }
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: false,
    modelName: 'event',
  }
);

module.exports = Event;
