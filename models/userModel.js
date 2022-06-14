const sequelize = require('./connection');
const Sequelize = require('sequelize');

const users = sequelize.define('users', {
    username: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
        unique: true,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING,
        unique: true,
        isEmail: true,
        allowNull: false,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    },
});

module.exports = { users, sequelize };
