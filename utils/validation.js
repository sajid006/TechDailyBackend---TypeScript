const auth = require('basic-auth');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
const users = userModel.users;
const bcrypt = require('bcrypt');
const AppError = require('./appError');
const catchAsync = require('./catchAsync');

exports.checkToken = catchAsync( async(req, res, next) => {

  //check if authorization token is available
    const { authorization } = req.headers;
    let token;
    if(authorization && authorization.startsWith('Bearer')){
      token = authorization.split(' ')[1];
    }
    else{
      return next(new AppError('Your are not logged in', 401));
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const username = decoded.username;

    //check if the user is deleted
    const user0 = await users.findAll({ where: {username} });
    if(user0.length==0){
      return next(new AppError(`The user for this token no longer exists`, 401));;
    }

    //check if the user is the same as the one trying to post the article
    let userParam;
    if(req.body.username)userParam = req.body.username;
    else userParam = req.params.id;
    const user1 = await users.findAll({ where: { username } });
    if(user1.length==0 || user1[0].username != username){
      return next(new AppError(`invalid username`, 400));
    }
    req.username = username;
    next();
});

// === validation should be done in models/any other utility function
// === Refactor this method
//Validate a user
exports.validatetUser = catchAsync( async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    if(!username || !password){
      return next(new AppError(`Please provide username and password`, 400));
    }
    const user1 = await users.findAll({ where: { username: `${username}` } });
    if (user1 && user1.length > 0) {
      const isValidPassword = await bcrypt.compare(
        password,
        user1[0].password
      );
      if (isValidPassword) {
        const token = jwt.sign(
          {
            username: user1[0].username
          },
          process.env.JWT_SECRET,
          {
            expiresIn: '1h',
          }
        );
        res.status(200).json({
          access_token: token,
          message: 'Login successful',
        });
      } else {
        return next(new AppError(`Authentication failed`, 401));
      }
    } else {
      return next(new AppError(`Authentication failed`, 401));
    }
});
