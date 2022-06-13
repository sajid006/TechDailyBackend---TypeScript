const services = require('../services/articleServices');
const catchAsync = require('../utils/catchAsync');
const contentNegotiation = require('../utils/contentNegotiation');

//Read all articles
exports.getAllArticles = catchAsync( async(req, res, next) => {

    const allArticles = await services.findAllArticles();
    contentNegotiation.sendResponse(req, res, allArticles);
});

//Read an article
exports.getOneArticle = catchAsync( async (req, res, next) => {
    const id = req.params.id * 1;
    const myArticle = await services.findOneArticle(id);
    contentNegotiation.sendResponse(req, res, myArticle);
});

//Create a article
exports.postArticle =catchAsync ( async (req, res, next) => {
    let articleData = {
      username: req.body.username,
      title: req.body.title,
      description: req.body.description,
      rating: req.body.rating,
    };
    const newArticle = await services.createArticle(articleData);
    contentNegotiation.sendResponse(req, res, newArticle,201);
});

//Update a article
exports.patchArticle = catchAsync( async (req, res, next) => {
    const title = req.body.title;
    const id = req.params.id;
    const myArticle = await services.updateArticle(id, title);
    contentNegotiation.sendResponse(req, res, myArticle);
});

//Delete a article
exports.deleteArticle = catchAsync( async(req, res, next) => {
    const id = req.params.id;
    const deleteResult = await services.removeArticle(id);
    res.status(204).send();
});
