import * as Sequelize from 'sequelize';
import sequelize from './connection';
import users from './userModel';
const stories = sequelize.define('stories', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  username: {
    type: Sequelize.STRING,
    references: {
      model: users,
      key: 'username',
    },
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  rating: {
    type: Sequelize.INTEGER,
    validate: {
      min: 1,
      max: 5,
    },
  },
});

export default stories;
