const services = require('../services/userServices');
const bcrypt = require('bcrypt');
const catchAsync = require('../utils/catchAsync');
const contentNegotiation = require('../utils/contentNegotiation');
const { generateToken } = require('../utils/validation');

exports.getAllUsers = catchAsync(async (req, res, next) => {
    const allUsers = await services.findAllUsers();
    contentNegotiation.sendResponse(req, res, allUsers);
});

exports.getUser = catchAsync(async (req, res, next) => {
    const id = req.params.id;
    const myUser = await services.findOneUser(id);
    contentNegotiation.sendResponse(req, res, myUser);
});

exports.postUser = catchAsync(async (req, res, next) => {
    const userData = {
        username: null,
        name: null,
        email: null,
        password: null,
    };
    userData.name = req.body.name;
    userData.email = req.body.email;
    userData.hashedPassword = await bcrypt.hash(req.body.password, 10);
    userData.username = req.body.username;
    const newUser = await services.createUser(userData);
    // move to a utility function
    const accessToken = generateToken(newUser.username);
    const userWithToken = { ...newUser.dataValues, accessToken };
    contentNegotiation.sendResponse(req, res, userWithToken, 201);
});

exports.patchUser = catchAsync(async (req, res, next) => {
    const email = req.body.email;
    const name = req.body.name;
    const username = req.params.id;
    const myUser = await services.updateUser(username, name, email);
    contentNegotiation.sendResponse(req, res, myUser);
});

exports.deleteUser = catchAsync(async (req, res, next) => {
    const id = req.params.id;
    await services.removeUser(id);
    res.status(204).send();
});
