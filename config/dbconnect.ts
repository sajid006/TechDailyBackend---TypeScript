import sequelize from '../models/connection';

const db = async () => {
  try {
    await sequelize.sync({ force: false }).then((result: any) => {
      console.log('Database connected');
    });
  } catch (err) {
    console.log(err);
    return err;
  }
};
export default db;
