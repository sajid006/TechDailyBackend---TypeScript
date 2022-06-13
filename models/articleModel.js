const sequelize = require('./connection');
const { DataTypes, Deferrable } = require('sequelize');
const users = require('./userModel').users;
const Sequelize = require('sequelize');

//Create article table
const article = sequelize.define('articles', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    username: {
      type: Sequelize.STRING,
      references: {
        model: users,
        key: 'username',
        deferrable: Deferrable.INITIALLY_IMMEDIATE,
      },
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING,
    },
    rating: {
      type: Sequelize.INTEGER,
      defaultValue: 1,
      validate: {
        min: 1,
        max: 5,
      },
    },
  });

  module.exports = {sequelize, article};
  