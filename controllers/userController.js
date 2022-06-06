const express = require('express');
const Sequelize = require('sequelize');
const sequelize = require('../connection');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const user = sequelize.models.users;

//Check if the there is any user with this ID
exports.checkID = (req, res, next) => {
  const value = req.params.id;
  console.log(`User id ${value}`);
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

//Check if the request contains the mandatory fields
exports.checkBody = (req, res, next) => {
  if (!req.body.username) {
    return res.status(400).json({
      status: 'fail',
      message: 'username missing',
    });
  }
  next();
};

//Read all users
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

//Create a user
exports.postUser = async (req, res) => {
  try{
  const name = req.body.name;
  const email = req.body.email;
  //const password = req.body.password;
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const username = req.body.username;
  sequelize
    .sync()
    .then((result) => {
      console.log(result);
      return user.create({
        username: `${username}`,
        name: `${name}`,
        email: `${email}`,
        password: `${hashedPassword}`,
      });
    })
    .then((user1) => {
      console.log('First user created:', user1);
      console.log(JSON.stringify(user1));
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
  }
  catch{
    res.status(401).json({
      error: 'User creation failed',
    });
  }
};

//Validate a user
exports.validatetUser = (req, res) => {
  //const name = req.body.name;
  //const email = req.body.email;
  //const password = req.body.password;
  //const hashedPassword = bcrypt.hash(req.body.password, 10);
  const username = req.body.username;
  sequelize
    .sync()
    .then((result) => {
      console.log(result);
      return user.findAll({
        where: {
          username: `${username}`,
        },
      });
    })
    .then(async (user1) => {
      try {
        console.log(user1.length);
        if (user1 && user1.length > 0) {
          const isValidPassword = await bcrypt.compare(
            req.body.password,
            user1[0].password
          );
          
          if (isValidPassword) {
            console.log("yo");
            const token = jwt.sign(
              {
                username: user1[0].username,
                Name: user1[0].name,
              },
              process.env.JWT_SECRET,
              {
                expiresIn: '1h',
              }
            );
            console.log(user1[0]);
            res.status(200).json({
              access_token: token,
              message: 'Login successful',
            });
          } else {
            res.status(401).json({
              error: 'Authentication failed',
            });
          }
        } else {
          res.status(401).json({
            error: 'Authentication failed',
          });
        }
      } catch {
        res.status(401).json({
          error: 'Authentication failed',
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

//Read one user
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

//Update a user
exports.patchUser = (req, res) => {
  const name = req.body.name;
  const id = req.params.id;

  sequelize
    .sync()
    .then((result) => {
      console.log(result);
      return user.update(
        { username: `${username}`, name: `${name}` },
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

//Delete a user
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
