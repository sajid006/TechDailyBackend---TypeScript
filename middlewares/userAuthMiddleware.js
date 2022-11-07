const services = require('../services/userServices');
const catchAsync = require('../utils/catchAsync');

exports.checkUsername = catchAsync(async (req, res, next) => {
  const value = req.params.id;
  const noOfUser = await services.validateUser(value);
  if (noOfUser < 1) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid Id',
    });
  }

  next();
});

exports.checkUpdateBody = (req, res, next) => {
  if (!req.body.email || !req.body.name) {
    return res.status(400).json({
      status: 'fail',
      message: 'name or email missing',
    });
  }
  next();
};

exports.checkPostBody = (req, res, next) => {
  if (!req.body.username) {
    return res.status(400).json({
      status: 'fail',
      message: 'Username missing',
    });
  }
  if (!req.body.name) {
    return res.status(400).json({
      status: 'fail',
      message: 'Name missing',
    });
  }
  if (!req.body.email) {
    return res.status(400).json({
      status: 'fail',
      message: 'Email missing',
    });
  }
  if (!req.body.password) {
    return res.status(400).json({
      status: 'fail',
      message: 'Password missing',
    });
  }
  if (req.body.password.length < 8) {
    return res.status(400).json({
      status: 'fail',
      message: 'Password length must be at least 8',
    });
  }
  next();
};
