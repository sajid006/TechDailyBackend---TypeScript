const userModel = require('../models/userModel');
const users = userModel.users;

exports.validateUser = async (value) => {
  const validUsers = await users.findAll({
    where: {
      username: `${value}`,
    },
  });
  const noOfUsers = validUsers.length;
  return noOfUsers;
};

exports.findAllUsers = async () => {
  const usersList = await users.findAll();
  return usersList;
};

exports.findOneUser = async (username) => {
  const user = await users.findAll({
    where: {
      username: `${username}`,
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

exports.updateUser = async (username, name, email) => {
  const myUser = await users.update(
    { email: `${email}`, name: `${name}` },
    {
      where: {
        username: `${username}`,
      },
    }
  );
  return myUser;
};

exports.removeUser = async (username) => {
  let deleted = users.destroy({
    where: {
      username: `${username}`,
    },
  });
  return deleted;
};
