const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
const articleModel = require('../models/articleModel');
const bcrypt = require('bcrypt');
const AppError = require('./appError');
const catchAsync = require('./catchAsync');
const contentNegotiation = require('./contentNegotiation');
const users = userModel.users;
const articles = articleModel.articles;

const generateToken = (username) => {
    return jwt.sign(
        {
            username,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRATION_TIME,
        }
    );
};

const decodeToken = (req, res) => {
    // check if authorization token is available
    const { authorization } = req.headers;
    let token;
    if (authorization && authorization.startsWith('Bearer')) {
        token = authorization.split(' ')[1];
    } else {
        res.status(401).send('You are not logged in');
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded.username;
};
const checkTokenUser = catchAsync(async (req, res, next) => {
    const usernameFromToken = decodeToken(req, res);

    // check if the user is available
    const userFromToken = await users.findOne({
        where: { username: usernameFromToken },
    });
    if (!userFromToken) {
        return next(new AppError('The user for this token does not exist', 401));
    }

    // check if the user is the same as the one trying to update/delete the user
    if (!req.params.id || req.params.id !== usernameFromToken) {
        return next(new AppError('You are not authorized', 401));
    }

    req.username = usernameFromToken;
    next();
});

const checkTokenArticle = catchAsync(async (req, res, next) => {
    const usernameFromToken = decodeToken(req, res, next);

    // check if the user is available
    const userFromToken = await users.findOne({
        where: { username: usernameFromToken },
    });
    if (!userFromToken) {
        return next(new AppError('The user for this token does not exist', 401));
    }

    // check if the user is the same as the one trying to update/delete the user

    let usernameFromReq;
    if (!req.body.username && !req.params.id) return next(new AppError('Please provide a username', 401));
    if (req.body.username) usernameFromReq = req.body.username;
    else if (req.params.id) {
        const article = await articles.findOne({
            where: { id: req.params.id },
        });
        usernameFromReq = article.username;
    }
    if (usernameFromReq !== usernameFromToken) {
        return next(new AppError('You are not authorized', 401));
    }

    req.username = usernameFromToken;
    next();
});

const validatetUser = catchAsync(async (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    if (!username || !password) {
        return next(new AppError('Please provide username and password', 400));
    }
    const user = await users.findOne({
        where: { username: `${username}` },
    });
    if (!user) return next(new AppError('Authentication failed', 401));
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) return next(new AppError('Authentication failed', 401));
    const token = generateToken(user.username);
    const messageWithToken = { message: 'Login Successfull', accessToken: token };
    contentNegotiation.sendResponse(req, res, messageWithToken, 201);
});

module.exports = {
    generateToken,
    checkTokenUser,
    checkTokenArticle,
    validatetUser,
};
