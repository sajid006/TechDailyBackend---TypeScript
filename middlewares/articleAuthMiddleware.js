const services = require('../services/articleServices');
const catchAsync = require('../utils/catchAsync');

exports.checkID = catchAsync(async (req, res, next) => {
  const value = req.params.id;
  const noOfArticle = await services.validateID(value);
  if (noOfArticle < 1) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid Id',
    });
  }
  next();
});

exports.checkBody = (req, res, next) => {
  if (!req.body.title) {
    return res.status(400).json({
      status: 'fail',
      message: 'title missing',
    });
  }
  next();
};
