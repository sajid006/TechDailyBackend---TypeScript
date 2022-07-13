const sequelize = require('../models/connection');

const db = async () => {
  try {
    await sequelize.sync({ force: true }).then((result) => {
      console.log('Database connected');
    });
  } catch (err) {
    console.log(err);
    return err;
  }
};
module.exports = db;
