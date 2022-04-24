const { response } = require('express');
const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class Post extends Model {}

Post.init(
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
    salvage_title: {
        type: DataTypes.STRING,
      
    },
    transmission: {
        type: DataTypes.STRING,
        allowNull: true,
    },
   imageUrl: {
      type: DataTypes.STRING,
  }
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'post',
  }
  
);

module.exports = Post;