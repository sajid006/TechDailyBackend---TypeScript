const express = require('express');
//const databaseRouter = require("../connection");
const Sequelize = require('sequelize');
const sequelize = require('../connection');

//Route handler for users
//const users = pool.query();

//const users = databaseRouter;
const user = sequelize.models.users;
exports.checkID = (req, res, next, val) => {
  console.log(`User id ${val} `);
  sequelize
    .sync()
    .then((result) => {
      console.log(result);
      return user.count();
    })
    .then((noOfUser) => {
      if (req.params.id * 1 > noOfUser) {
        return res.status(404).json({
          status: 'fail',
          message: 'Invalidd Id',
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });

  next();
};

exports.checkBody = (req, res, next) => {
  if (!req.body.username) {
    return res.status(400).json({
      status: 'fail',
      message: 'name/price missing',
    });
  }
  next();
};
exports.getAllUsers = (req, res) => {
  //console.log(users);
  sequelize
    .sync()
    .then((result) => {
      console.log(result);
      return user.findAll();
    })
    .then((allUsers) => {
      console.log('All the users', JSON.stringify(allUsers));
      res.status(200).json({
        status: 'success',
        requestedAt: req.requestTime,
        data: {
          user: JSON.stringify(allUsers),
        },
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.postUser = (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const username = req.body.username;
  sequelize
    .sync({ force: true })
    .then((result) => {
      console.log(result);
      return user.create({
        username: `${username}`,
        name: `${name}`,
        email: `${email}`,
        password: `${password}`,
      });
    })
    .then((user1) => {
      console.log('First user created:', user1);
      res.status(200).json({
        status: 'success',
        requestedAt: req.requestTime,
        data: {
          user: JSON.stringify(user1),
        },
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.getOneUser = (req, res) => {
  const id = req.params.id * 1;
  sequelize
    .sync()
    .then((result) => {
      console.log(result);
      return user.findAll({
        where: {
          id: `${id}`,
        },
      });
    })
    .then((allUsers) => {
      console.log('All the users', JSON.stringify(allUsers));
      res.status(200).json({
        status: 'success',
        requestedAt: req.requestTime,
        data: {
          user: JSON.stringify(allUsers),
        },
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.patchUser = (req, res) => {
  const name = req.body.name;
  const id = req.params.id;

  sequelize
    .sync()
    .then((result) => {
      console.log(result);
      return user.update(
        { name: `${name}` },
        {
          where: {
            id: `${id}`,
          },
        }
      );
    })
    .then((user1) => {
      console.log('User updated', user1);
      res.status(200).json({
        status: 'success',
        requestedAt: req.requestTime,
        data: {
          user: JSON.stringify(user1),
        },
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.deleteUser = (req, res) => {
  const id = req.params.id;
  sequelize
    .sync()
    .then((result) => {
      console.log(result);
      return user.destroy({
        where: {
          id: `${id}`,
        },
      });
    })
    .then((user1) => {
      console.log('User deleted', user1);
      res.status(200).json({
        status: 'success',
        requestedAt: req.requestTime,
        data: {
          user: JSON.stringify(user1),
        },
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
