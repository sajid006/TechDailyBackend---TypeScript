const sequelize = require('./connection');

const db = async () => {
    try {
        await sequelize.sync().then((result) => {
            console.log('Database connected');
        });
    } catch (err) {
        console.log(err);
        return err;
    }
};
module.exports = db;
