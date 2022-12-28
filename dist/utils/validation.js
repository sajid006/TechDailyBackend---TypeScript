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
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const storyModel_1 = require("../models/storyModel");
const userModel_1 = require("../models/userModel");
const appError_1 = require("./appError");
const catchAsync_1 = require("./catchAsync");
const contentNegotiation_1 = require("./contentNegotiation");
const generateToken = (username) => {
    return jwt.sign({
        username,
    }, process.env.JWT_SECRET, {
        expiresIn: '50d',
    });
};
const decodeToken = (req, res) => {
    // check if authorization token is available
    let token;
    console.log(req.headers);
    console.log(req.headers.authorization);
    if (req.headers.authorization) {
        token = req.headers.authorization.split(' ')[1];
    }
    else {
        return '';
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded.username;
    }
    catch (_a) {
        return '';
    }
};
const verifyToken = (req, res, next) => {
    const username = decodeToken(req, res);
    return res.send(username);
};
const logoutUser = (req, res, next) => {
    //res.cookie('user', '', { httpOnly: true, maxAge: 0 });
    return res.send('');
};
const checkTokenUser = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const usernameFromToken = decodeToken(req, res);
    if (!usernameFromToken) {
        return next(new appError_1.default('Your token does not contain any user', 401));
    }
    // check if the user is available
    const userFromToken = yield userModel_1.default.findAll({
        where: { username: usernameFromToken },
    });
    if (userFromToken.length == 0) {
        return next(new appError_1.default('The user for this token does not exist', 401));
    }
    // check if the user is the same as the one trying to update/delete the user
    if (!req.params.id || req.params.id !== usernameFromToken) {
        return next(new appError_1.default('You are not authorized', 401));
    }
    req.body.username = usernameFromToken;
    next();
}));
const checkTokenStory = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const usernameFromToken = decodeToken(req, res);
    if (!usernameFromToken) {
        return next(new appError_1.default('Your token does not contain any user', 401));
    }
    // check if the user is available
    const userFromToken = yield userModel_1.default.findAll({
        where: { username: usernameFromToken },
    });
    if (userFromToken.length == 0) {
        return next(new appError_1.default('The user for this token does not exist', 401));
    }
    // check if the user is the same as the one trying to update/delete the user
    let usernameFromReq;
    if (!req.body.username && !req.params.id)
        return next(new appError_1.default('Please provide a username or story id', 401));
    if (req.body.username)
        usernameFromReq = req.body.username;
    else {
        const storyList = yield storyModel_1.default.findAll({
            where: { id: req.params.id },
        });
        const story = storyList[0];
        usernameFromReq = story.username;
    }
    if (usernameFromReq !== usernameFromToken) {
        return next(new appError_1.default('You are not authorized', 401));
    }
    req.body.username = usernameFromToken;
    next();
}));
const validatetUser = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.body.username;
    const password = req.body.password;
    if (!username || !password) {
        return next(new appError_1.default('Please provide username and password', 400));
    }
    console.log(username);
    const userList = yield userModel_1.default.findAll({
        where: { username },
    });
    if (userList.length == 0)
        return next(new appError_1.default('Authentication failed', 401));
    const user = userList[0];
    const isValidPassword = yield bcrypt.compare(password, user.password);
    if (!isValidPassword)
        return next(new appError_1.default('Authentication faileddd', 401));
    const token = generateToken(user.username);
    const messageWithUsername = { message: 'Login Successfull', username: username, token: token };
    //res.cookie('user', token, { httpOnly: true });
    (0, contentNegotiation_1.default)(req, res, messageWithUsername, 201);
}));
const validation = {
    generateToken,
    checkTokenUser,
    checkTokenStory,
    validatetUser,
    verifyToken,
    logoutUser,
};
exports.default = validation;
