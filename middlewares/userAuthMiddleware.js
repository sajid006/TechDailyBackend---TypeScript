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

exports.checkBody = (req, res, next) => {
    if (!req.body.email || !req.body.name) {
        return res.status(400).json({
            status: 'fail',
            message: 'name or email missing',
        });
    }
    next();
};
