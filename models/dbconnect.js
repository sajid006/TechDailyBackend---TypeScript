const sequelize = require('./connection');
const Sequelize = require('sequelize');

const db = databaseConnect = async() => {
    try {
        await sequelize
          .sync()
          .then((result) => {
            console.log(result);
          })
          
      } catch(err) {
        console.log(err);
        return null;
      }
};
module.exports = db;