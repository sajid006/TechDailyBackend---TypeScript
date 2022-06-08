const sequelize = require('./connection');
const { DataTypes, Deferrable } = require('sequelize');
const user = require('./userModel');
const Sequelize = require('sequelize');

//Create article table
const article = sequelize.define('articles', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    userId: {
      type: Sequelize.INTEGER,
      references: {
        model: user,
        key: 'id',
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
      defaultValue: 0,
      validate: {
        min: 0,
        max: 4,
      },
    },
  });

  module.exports = {sequelize, article};