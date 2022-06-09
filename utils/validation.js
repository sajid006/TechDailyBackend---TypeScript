const auth = require('basic-auth');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
const users = userModel.users;
const bcrypt = require('bcrypt');

exports.checkToken = (req, res, next) => {
  const { authorization } = req.headers;
  try {
    const token = authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { username, userId } = decoded;
    req.username = username;
    req.userId = userId;
    next();
  } catch (err) {
    next(err);
  }
};

// === validation should be done in models/any other utility function
// === Refactor this method
//Validate a user
exports.validatetUser = async (req, res) => {
  try {
    const username = req.body.username;
    console.log(username);
    const user1 = await users.findAll({ where: { username: `${username}` } });
    console.log(user1);
    if (user1 && user1.length > 0) {
      const isValidPassword = await bcrypt.compare(
        req.body.password,
        user1[0].password
      );
      if (isValidPassword) {
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
        error: 'Authentication faailed',
      });
    }
  } catch (err) {
    res.status(401).json({
        error: 'Authentication faailed',
    });
  }
};
