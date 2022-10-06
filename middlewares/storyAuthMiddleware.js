const services = require('../services/storyServices');
const catchAsync = require('../utils/catchAsync');

exports.checkID = catchAsync(async (req, res, next) => {
  const value = req.params.id;
  const noOfStory = await services.validateID(value);
  if (noOfStory < 1) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid Id',
    });
  }
  next();
});

exports.checkBody = (req, res, next) => {
  if (!req.body.title || !req.body.description) {
    return res.status(400).json({
      status: 'fail',
      message: 'Title or description missing',
    });
  }
  next();
};
