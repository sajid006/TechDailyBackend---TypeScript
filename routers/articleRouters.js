const express = require('express');
const articleController = require('../controllers/articleController');
const validation = require('../utils/validation');
const articleAuthMiddleware = require('../middlewares/articleAuthMiddleware');

const router = express.Router();

router
    .route('/')
    .get(articleController.getAllArticles)
    .post(
        validation.checkTokenForArticle,
        articleAuthMiddleware.checkBody,
        articleController.postArticle
    );

router
    .route('/:id')
    .get(articleAuthMiddleware.checkID, articleController.getArticle)
    .patch(
        articleAuthMiddleware.checkID,
        validation.checkTokenForArticle,
        articleAuthMiddleware.checkBody,
        articleController.patchArticle
    )
    .delete(
        articleAuthMiddleware.checkID,
        validation.checkTokenForArticle,
        articleController.deleteArticle
    );

module.exports = router;
