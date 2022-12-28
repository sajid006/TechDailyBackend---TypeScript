"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
/*
const sequelize = new Sequelize('mysql', 'sajid', '{mypassword}', {
  dialect: 'mssql',
  host: 'techdailybackend.database.windows.net',
  port: '1433',
  dialectOptions: {
    encrypt: true,
  },
  logging: true,
});
*/
const sequelize = new sequelize_1.Sequelize('techdailybackend', 'root', '', {
    dialect: 'mysql',
    host: 'localhost',
    port: 3306,
});
exports.default = sequelize;
