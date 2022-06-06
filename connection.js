
const Sequelize = require('sequelize');
const { DataTypes, Deferrable } = require('sequelize');

//Connect mysql database
const sequelize = new Sequelize('sportsdaily', 'root', '', {
  dialect: 'mysql',
  host: 'localhost',
});

//Create user table
const user = sequelize.define('users', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
  },
  email: {
    type: Sequelize.STRING,
  },
  signUpTime: {
    type: DataTypes.TIME,
    defaultValue: DataTypes.NOW,
  },
  password: {
    type: Sequelize.STRING,
  },
});

//Create article table
const article = sequelize.define('articles', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  userId: {
    type: Sequelize.INTEGER,
    references: {
      model: user,
      key: 'id',
      deferrable: Deferrable.INITIALLY_IMMEDIATE,
    },
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
  },
  rating: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    validate: {
      min: 0,
      max: 4,
    },
  },
});
module.exports = sequelize;
