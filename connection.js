/*
const mysql = require("mysql");

const mysqlConnection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password:"",
    database: "sportsdaily",
    connectionLimit: 10
});

mysqlConnection.connect((err)=> {
    if(!err) {
        console.log("Connected");
    }
    else{
        console.log("FAILEd");
    }
});

module.exports = mysqlConnection;
*/

const Sequelize = require('sequelize');
//const { getAllUsers } = require('./controllers/userController');
const {DataTypes, Deferrable} = require("sequelize");

const sequelize = new Sequelize('sportsdaily', 'root', '', {
  dialect: 'mysql',
  host: 'localhost',
});
console.log('connection js');
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
      defaultValue: DataTypes.NOW
  },
  password: {
    type: Sequelize.STRING,
  },
});

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
  },
  description: {
    type: Sequelize.STRING,
  },
  rating: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0,
      max: 4,
    },
  },
  privacy: {
    type: Sequelize.BOOLEAN,
  },
});
module.exports = sequelize;
