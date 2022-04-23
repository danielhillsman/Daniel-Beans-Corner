const { response } = require('express');
const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class Car extends Model {}

Car.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'user',
          key: 'id',
        },
    },
    make_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    car_model: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    year: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    mileage: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    color: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    salvage_title: {
        type: DataTypes.STRING,
      
    },
    transmission: {
        type: DataTypes.STRING,
        allowNull: false,
    },
   imageUrl: {
      type: DataTypes.STRING,
  }
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'car',
  }
  
);

module.exports = Car;