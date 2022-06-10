const sequelize = require('./connection');
const Sequelize = require('sequelize');
const AppError = require('../utils/appError');

const db = databaseConnect = async() => {
    try {
        await sequelize
          .sync()
          .then((result) => {
            console.log('Database connected');
          })
          
      } catch(err) {
        console.log(err);
        return err;
      }
};
module.exports = db;