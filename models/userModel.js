const sequelize = require('./connection');
const Sequelize = require('sequelize');

const users = sequelize.define('users', {
  username: {
    type: Sequelize.STRING,
    unique: { args: true, msg: 'Username must be unique' },
    primaryKey: { args: true, msg: 'Username must be unique' },
    validate: {
      is: { args: /^[A-Za-z][A-Za-z0-9_]{4,30}$/, msg: 'Username not acceptable' },
    },
  },
  name: {
    type: Sequelize.STRING,
    validate: {
      is: { args: /^([\w]{3,})+\s+([\w\s]{3,})+$/i, msg: 'Name not acceptable' },
    },
  },
  email: {
    type: Sequelize.STRING,
    unique: { args: true, msg: 'Email must be unique' },
    validate: { isEmail: { msg: 'Invalid email.' } },
  },
  password: {
    type: Sequelize.STRING,
  },
});

module.exports = { users };
