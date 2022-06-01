const express = require('express');
const articleController = require('./../controllers/articleController');
const router = express.Router();

router
  .route('/')
  .get(articleController.getAllArticles)
  .post(articleController.postArticle);

router
  .route('/:id')
  .get(articleController.getOneArticle)
  .patch(articleController.patchArticle)
  .delete(articleController.deleteArticle);

module.exports = router;
