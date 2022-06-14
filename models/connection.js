const Sequelize = require('sequelize');

// Connect mysql database
const sequelize = new Sequelize('sportsdaily', 'root', '', {
    dialect: 'mysql',
    host: 'localhost',
});

module.exports = sequelize;
