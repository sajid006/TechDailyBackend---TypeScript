//const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

const sequelize = userModel.sequelize;
const users = userModel.users;

exports.validateID = async (value) => {
  try {
    let noOfUsers;
    await sequelize
      .sync()
      .then((result) => {
        console.log(result);
        return users.findAll({
          where: {
            id: `${value}`,
          },
        });
      })
      .then((validUsers) => {
        noOfUsers = validUsers.length;
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(noOfUsers);
    return noOfUsers;
  } catch {
    console.log('Some unknown error occured');
    return null;
  }
};

exports.findAllUsers = async () => {
  try {
    let usersList;
    await sequelize
      .sync()
      .then((result) => {
        console.log(result);
        return users.findAll();
      })
      .then((allUsers) => {
        console.log(allUsers);
        usersList = allUsers;
      })
      .catch((err) => {
        console.log(err);
      });
    return usersList;
  } catch {
    console.log('Some unknown error occured');
    return null;
  }
};
exports.findOneUser = async (userID) => {
  try {
    let user;
    await sequelize
      .sync()
      .then((result) => {
        console.log(result);
        return users.findAll({
          where: {
            id: `${userID}`,
          },
        });
      })
      .then((myUser) => {
        user = myUser;
      })
      .catch((err) => {
        console.log(err);
      });
    return user;
  } catch {
    console.log('Some unknown error occured');
    return null;
  }
};

exports.createUser = async (userData) => {
  try {
    let newUser;
    await sequelize
      .sync()
      .then((result) => {
        console.log(result);
        return users.create({
          username: `${userData.username}`,
          name: `${userData.name}`,
          email: `${userData.email}`,
          password: `${userData.hashedPassword}`,
        });
      })
      .then((user1) => {
        newUser = user1;
        console.log(newUser);
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(newUser);
    return newUser;
  } catch {
    console.log('Some unknown error occured');
    return null;
  }
};

exports.updateUser = async (id, username, name) => {
  try {
    let myUser;
    await sequelize
      .sync()
      .then((result) => {
        console.log(result);
        return users.update(
          { username: `${username}`, name: `${name}` },
          {
            where: {
              id: `${id}`,
            },
          }
        );
      })
      .then((user1) => {
        console.log(user1);
        myUser = user1;
      })
      .catch((err) => {
        console.log(err);
      });
    return myUser;
  } catch {
    console.log('Some unknown error occured');
    return null;
  }
};

exports.removeUser = async (id) => {
  try {
    let deleted;
    await sequelize
      .sync()
      .then((result) => {
        console.log(result);
        return users.destroy({
          where: {
            id: `${id}`,
          },
        });
      })
      .then((deleteStatus) => {
        deleted = deleteStatus;
      })
      .catch((err) => {
        console.log(err);
      });
    return deleted;
  } catch {
    console.log('Some unknown error occured');
    return null;
  }
};
