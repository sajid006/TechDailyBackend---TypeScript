const userModel = require('../models/userModel');
const sequelize = userModel.sequelize;
const users = userModel.users;

exports.validateID = async (value) => {
  try {
    let validUsers = await users.findAll({
      where: {
        id: `${value}`,
      },
    });
    let noOfUsers = validUsers.length;
    return noOfUsers;
  } catch(err) {
    console.log(err);
    return err;
  }
};

exports.findAllUsers = async () => {
  try {
    let usersList = await users.findAll();
    return usersList;
  } catch(err) {
    console.log(err);
    return err;
  }
};
exports.findOneUser = async (userID) => {
  try {
    let user = await users.findAll({
      where: {
        id: `${userID}`,
      },
    });
    return user;
  } catch(err) {
    console.log(err);
    return err;
  }
};

exports.createUser = async (userData) => {
  try {
    let newUser = await users.create({
      username: `${userData.username}`,
      name: `${userData.name}`,
      email: `${userData.email}`,
      password: `${userData.hashedPassword}`,
    });
    return newUser;
  } catch(err) {
    console.log(err);
    return err;
  }
};

exports.updateUser = async (id, username, name) => {
  try {
    let myUser = await users.update(
      { username: `${username}`, name: `${name}` },
      {
        where: {
          id: `${id}`,
        },
      }
    );
    return myUser;
  } catch(err) {
    console.log(err);
    return err;
  }
};

exports.removeUser = async (id) => {
  try {
    let deleted = users.destroy({
      where: {
        id: `${id}`,
      },
    });
    return deleted;
  } catch(err) {
    console.log(err);
    return err;
  }
};
