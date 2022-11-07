const Sequelize = require('sequelize');

const sequelize = new Sequelize('mysql', 'sajid', '{mypassword}', {
  dialect: 'mssql',
  host: 'techdailybackend.database.windows.net',
  port: '1433',
  dialectOptions: {
    encrypt: true,
  },
  logging: true,
});

/*
const sequelize = new Sequelize('techdailybackend', 'root', '', {
  dialect: 'mysql',
  host: 'localhost',
  port: '3306',
});
*/
module.exports = sequelize;
