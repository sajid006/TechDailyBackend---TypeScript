const sequelize = require('./connection');
const Sequelize = require('sequelize');

const users = sequelize.define('users', {
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: { args: true, msg: 'Username must be given' },
    validate: {
      is: { args: /^[A-Za-z][A-Za-z0-9_]{4,30}$/, msg: 'Username not acceptable' },
    },
  },
  name: {
    type: Sequelize.STRING,
    allowNull: { args: false, msg: 'Name is required.' },
    validate: {
      is: { args: /[a-zA-Z][a-zA-Z ]*/, msg: 'Name not acceptable' },
    },
  },
  email: {
    type: Sequelize.STRING,
    unique: { args: false, msg: 'Email must be unique' },
    allowNull: { args: false, msg: 'Email is required.' },
    validate: { isEmail: { msg: 'Invalid email.' } },
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = { users };
