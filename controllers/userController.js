const services = require('../services/userServices');
const bcrypt = require('bcrypt');
const catchAsync = require('../utils/catchAsync');
const jwt = require('jsonwebtoken');
const { all } = require('proxy-addr');

//Read all users
exports.getAllUsers = catchAsync(async (req, res, next) => {
  const allUsers = await services.findAllUsers();
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    data: {
      user: JSON.stringify(allUsers),
    },
  });
});

//Read one user
exports.getOneUser = catchAsync(async (req, res, next) => {
  //console.log(req.headers.accept);
  const id = req.params.id * 1;
  const myUser = await services.findOneUser(id);
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    data: {
      user: JSON.stringify(myUser),
    },
  });
});

//Create a user
exports.postUser = catchAsync(async (req, res, next) => {
  let userData = {
    username: null,
    name: null,
    email: null,
    password: null,
  };
  userData.name = req.body.name;
  userData.email = req.body.email;
  userData.hashedPassword = await bcrypt.hash(req.body.password, 10);
  userData.username = req.body.username;
  console.log(userData);
  const newUser = await services.createUser(userData);

  const token = jwt.sign(
    {
      username: newUser.username,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '1h',
    }
  );

  console.log('First user created:', newUser);
  console.log(JSON.stringify(newUser));
  res.status(201).json({
    status: 'success',
    token,
    requestedAt: req.requestTime,
    data: {
      user: JSON.stringify(newUser),
    },
  });
});

//Update a user
exports.patchUser = catchAsync(async (req, res, next) => {
  const username = req.body.username;
  const name = req.body.name;
  const id = req.params.id;
  const myUser = await services.updateUser(id, username, name);
  console.log('User updated', myUser);
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    data: {
      user: JSON.stringify(myUser),
    },
  });
});

//Delete a user
exports.deleteUser = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const deleteResult = await services.removeUser(id);
  console.log('User deleted', deleteResult);
  res.status(204).json({
    status: 'success',
    requestedAt: req.requestTime,
  });
});
