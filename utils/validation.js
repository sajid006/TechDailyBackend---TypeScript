const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
const articleModel = require('../models/articleModel');
const bcrypt = require('bcrypt');
const AppError = require('./appError');
const catchAsync = require('./catchAsync');

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

const checkToken = (routeName) => {
    return catchAsync(async (req, res, next) => {
        // check if authorization token is available
        const { authorization } = req.headers;
        let token;
        if (authorization && authorization.startsWith('Bearer')) {
            token = authorization.split(' ')[1];
        } else {
            return next(new AppError('Your are not logged in', 401));
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const usernameFromToken = decoded.username;

        // check if the user is deleted
        const userFromToken = await users.findOne({
            where: { username: usernameFromToken },
        });
        if (!userFromToken) {
            return next(new AppError('The user for this token no longer exists', 401));
        }

        // check if the user is the same as the one trying to update/delete the user
        if (routeName == 'user') {
            if (!req.params.id) {
                return next(new AppError('Please provide a username', 401));
            } else if (req.params.id !== usernameFromToken) {
                return next(new AppError('You are not authorized', 401));
            }
        } else {
            let usernameFromReq;
            if (req.body.username) usernameFromReq = req.body.username;
            else if (req.params.id) {
                const article = await articles.findOne({
                    where: { id: req.params.id },
                });
                usernameFromReq = article.username;
            } else return next(new AppError('Please provide a username', 401));
            if (usernameFromReq !== usernameFromToken) {
                return next(new AppError('You are not authorized', 401));
            }
        }
        req.username = usernameFromToken;
        next();
    });
};

const validatetUser = catchAsync(async (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    if (!username || !password) {
        return next(new AppError('Please provide username and password', 400));
    }
    const user = await users.findOne({
        where: { username: `${username}` },
    });
    if (user) {
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (isValidPassword) {
            const token = generateToken(user.username);
            res.status(200).json({
                access_token: token,
                message: 'Login successful',
            });
        } else {
            return next(new AppError('Authentication failed', 401));
        }
    } else {
        return next(new AppError('Authentication failed', 401));
    }
});

module.exports = {
    generateToken,
    checkToken,
    validatetUser,
};
