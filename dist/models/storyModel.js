"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Sequelize = require("sequelize");
const connection_1 = require("./connection");
const userModel_1 = require("./userModel");
const stories = connection_1.default.define('stories', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    username: {
        type: Sequelize.STRING,
        references: {
            model: userModel_1.default,
            key: 'username',
        },
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    rating: {
        type: Sequelize.INTEGER,
        validate: {
            min: 1,
            max: 5,
        },
    },
});
exports.default = stories;
