const services = require('../services/articleServices');
const catchAsync = require('../utils/catchAsync');
const contentNegotiation = require('../utils/contentNegotiation');

exports.getAllArticles = catchAsync(async (req, res, next) => {
    const allArticles = await services.findAllArticles();
    contentNegotiation.sendResponse(req, res, allArticles);
});

exports.getArticle = catchAsync(async (req, res, next) => {
    const id = req.params.id * 1;
    const myArticle = await services.findOneArticle(id);
    contentNegotiation.sendResponse(req, res, myArticle);
});

exports.postArticle = catchAsync(async (req, res, next) => {
    const articleData = {
        username: req.body.username,
        title: req.body.title,
        description: req.body.description,
        rating: req.body.rating,
    };
    const newArticle = await services.createArticle(articleData);
    contentNegotiation.sendResponse(req, res, newArticle, 201);
});

exports.patchArticle = catchAsync(async (req, res, next) => {
    const title = req.body.title;
    const id = req.params.id;
    const myArticle = await services.updateArticle(id, title);
    contentNegotiation.sendResponse(req, res, myArticle);
});

exports.deleteArticle = catchAsync(async (req, res, next) => {
    const id = req.params.id;
    await services.removeArticle(id);
    res.status(204).json({});
});
