const sequelize = require('./connection');
const { Deferrable } = require('sequelize');
const users = require('./userModel').users;
const Sequelize = require('sequelize');

const articles = sequelize.define('articles', {
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
        allowNull: { args: false, msg: 'Title is required.' },
    },
    description: {
        type: Sequelize.STRING,
    },
    rating: {
        type: Sequelize.INTEGER,
        validate: {
            min: 1,
            max: 5,
        },
    },
});

module.exports = { sequelize, articles };
