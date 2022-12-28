"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const services = require('../services/userServices');
const bcrypt = require("bcrypt");
const catchAsync = require('../utils/catchAsync');
const contentNegotiation = require('../utils/contentNegotiation');
const validation = require('../utils/validation');
const getAllUsers = catchAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const allUsers = yield services.findAllUsers();
    contentNegotiation.sendResponse(req, res, allUsers);
}));
const getUser = catchAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    console.log(id);
    const myUser = yield services.findOneUser(id);
    contentNegotiation.sendResponse(req, res, myUser);
}));
const postUser = catchAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = {};
    userData.name = req.body.name;
    userData.email = req.body.email;
    userData.password = yield bcrypt.hash(req.body.password, 10);
    userData.username = req.body.username;
    const newUser = yield services.createUser(userData);
    const token = validation.generateToken(newUser.username);
    //res.cookie('user', accessToken, { httpOnly: true });
    const userWithToken = Object.assign(Object.assign({}, newUser.dataValues), { token });
    contentNegotiation.sendResponse(req, res, userWithToken, 201);
}));
const patchUser = catchAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    const name = req.body.name;
    const username = req.params.id;
    const myUser = yield services.updateUser(username, name, email);
    contentNegotiation.sendResponse(req, res, myUser);
}));
const deleteUser = catchAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    yield services.removeUser(id);
    res.status(204).json({});
}));
const userController = {
    getAllUsers,
    getUser,
    postUser,
    patchUser,
    deleteUser,
};
exports.default = userController;
