const sequelize = require('./connection');
const Sequelize = require('sequelize');
const { DataTypes, Deferrable } = require('sequelize');

//Create user table
const users = sequelize.define('users', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
    signUpTime: {
      type: DataTypes.TIME,
      defaultValue: DataTypes.NOW,
    },
    password: {
      type: Sequelize.STRING,
    },
  });

  module.exports= {users, sequelize};

