import * as Sequelize from 'sequelize';
import sequelize from './connection';

const users = sequelize.define('users', {
  username: {
    type: Sequelize.STRING,
    unique: true,
    primaryKey: true,
    validate: {
      is: { args: /^[A-Za-z][A-Za-z0-9_]{4,30}$/, msg: 'Username not acceptable' },
    },
  },
  name: {
    type: Sequelize.STRING,
    validate: {
      is: { args: /^([\w]{3,})+\s+([\w\s]{3,})+$/i, msg: 'Name not acceptable' },
    },
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    validate: { isEmail: { msg: 'Invalid email.' } },
  },
  password: {
    type: Sequelize.STRING,
  },
});

export default users;
