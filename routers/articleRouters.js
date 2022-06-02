const express = require('express');
const articleController = require("../controllers/articleController");

const router = express.Router();

router.param('id',articleController.checkID);
router
  .route('/')
  .get(articleController.getAllArticles)
  .post(articleController.checkBody, articleController.postArticle);

router
  .route('/:id')
  .get(articleController.getOneArticle)
  .patch(articleController.patchArticle)
  .delete(articleController.deleteArticle);

module.exports = router;
