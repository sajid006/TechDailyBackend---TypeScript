const sequelize = require('./connection');
const Sequelize = require('sequelize');

const users = sequelize.define('users', {
    username: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: { args: true, msg: 'Username must be given' },
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
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
