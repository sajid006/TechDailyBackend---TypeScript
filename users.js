/*
const Sequelize = require('sequelize');
const sequelize = require('./connection');


console.log('users js');
console.log(sequelize.models.users);
const user = sequelize.models.users;
sequelize
  .sync({ force: true })
  .then((result) => {
    return user.create({ name: 'Sajid Hasan', email: 'sajid@gmail.com' });
    console.log(result);
  })
  .then((user1) => {
    console.log('First user created:', user1);
  })
  .catch((err) => {
    console.log(err);
  });
*/
//module.exports = user;
