"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Sequelize = require("sequelize");
const connection_1 = require("./connection");
const users = connection_1.default.define('users', {
    username: {
        type: Sequelize.STRING,
        unique: true,
        primaryKey: true,
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
        unique: true,
        validate: { isEmail: { msg: 'Invalid email.' } },
    },
    password: {
        type: Sequelize.STRING,
    },
});
exports.default = users;
