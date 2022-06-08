//const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
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
  } catch {
    console.log('Some unknown error occured');
    return null;
  }
};

exports.findAllUsers = async () => {
  try {
    let usersList = await users.findAll();
    return usersList;
  } catch {
    console.log('Some unknown error occured');
    return null;
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
  } catch {
    console.log('Some unknown error occured');
    return null;
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
  } catch {
    console.log('Some unknown error occured');
    return null;
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
  } catch {
    console.log('Some unknown error occured');
    return null;
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
  } catch {
    console.log('Some unknown error occured');
    return null;
  }
};
