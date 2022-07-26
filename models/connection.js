const Sequelize = require('sequelize');

const sequelize = new Sequelize('techdailybackend', 'root', '', {
  dialect: 'mysql',
  host: 'localhost',
});

module.exports = sequelize;
