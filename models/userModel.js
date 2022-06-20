const sequelize = require('./connection');
const Sequelize = require('sequelize');

const users = sequelize.define('users', {
    username: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: { args: true, msg: 'Username must be given' },
        validate: {
            is: { args: /^(?=.{4,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, msg: 'Username not acceptable' },
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
        unique: true,
        allowNull: { args: false, msg: 'Email is required.' },
        validate: { isEmail: { msg: 'Invalid email.' } },
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    },
});

module.exports = { users, sequelize };
