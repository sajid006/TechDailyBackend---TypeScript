const userModel = require('../models/userModel');
const sequelize = userModel.sequelize;
const users = userModel.users;
//const catchAsync = require('../utils/catchAsync');

exports.validateID = async (value) => {
  const validUsers = await users.findAll({
    where: {
      id: `${value}`,
    },
  });
  const noOfUsers = validUsers.length;
  return noOfUsers;
};

exports.findAllUsers = async () => {
  const usersList = await users.findAll();
  return usersList;
};

exports.findOneUser = async (userID) => {
  const user = await users.findAll({
    where: {
      id: `${userID}`,
    },
  });
  return user;
};

exports.createUser = async (userData) => {
  const newUser = await users.create({
    username: `${userData.username}`,
    name: `${userData.name}`,
    email: `${userData.email}`,
    password: `${userData.hashedPassword}`,
  });
  return newUser;
};

exports.updateUser = async (id, username, name) => {
  const myUser = await users.update(
    { username: `${username}`, name: `${name}` },
    {
      where: {
        id: `${id}`,
      },
    }
  );
  return myUser;
};

exports.removeUser = async (id) => {
  let deleted = users.destroy({
    where: {
      id: `${id}`,
    },
  });
  return deleted;
};
