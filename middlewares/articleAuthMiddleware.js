const services = require('../services/articleServices');
const catchAsync = require('../utils/catchAsync');

//Check if the there is any article with this ID
exports.checkID = catchAsync(async (req, res, next) => {
    const value = req.params.id;
    const noOfArticle = await services.validateID(value);
    // === replace all console logs with winston logging methods
    if (noOfArticle < 1) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid Id',
        });
    }
    //req.body.username =
    next();
});

//Check if request body contains the mandatory fields
exports.checkBody = (req, res, next) => {
    if (!req.body.title) {
        return res.status(400).json({
            status: 'fail',
            message: 'title missing',
        });
    }
    next();
};
