const services = require('../services/userServices');
const bcrypt = require('bcrypt');
const catchAsync = require('../utils/catchAsync');
const jwt = require('jsonwebtoken');
const { all } = require('proxy-addr');
const contentNegotiation = require('../utils/contentNegotiation');

//Read all users
exports.getAllUsers = catchAsync(async (req, res, next) => {
  
  const allUsers = await services.findAllUsers();
  console.log(allUsers);
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
  const id = req.params.id;
  const myUser = await services.findOneUser(id);
  contentNegotiation.sendResponse(req, res, myUser);
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
  contentNegotiation.sendResponse(req, res, newUser);
});

//Update a user
exports.patchUser = catchAsync(async (req, res, next) => {
  const email = req.body.email;
  const name = req.body.name;
  const username = req.params.id;
  const myUser = await services.updateUser(username, name, email);
  console.log('User updated', myUser);
  contentNegotiation.sendResponse(req, res, myUser);
});

//Delete a user
exports.deleteUser = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const deleteResult = await services.removeUser(id);
  contentNegotiation.sendResponse(req, res, deleteResult);
});
