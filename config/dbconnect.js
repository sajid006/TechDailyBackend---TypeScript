const sequelize = require('../models/connection');

const db = async () => {
  try {
    await sequelize.sync({ force: false }).then((result) => {
      console.log('Database connected');
    });
  } catch (err) {
    console.log(err);
    return err;
  }
};
module.exports = db;
