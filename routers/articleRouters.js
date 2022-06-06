const express = require('express');
const articleController = require("../controllers/articleController");

const router = express.Router();

//router.param('id',articleController.checkID);
router
  .route('/')
  .get(articleController.getAllArticles)
  .post(articleController.checkBody, articleController.postArticle);

router
  .route('/:id')
  .get(articleController.checkID ,articleController.getOneArticle)
  .patch(articleController.checkID, articleController.checkBody, articleController.patchArticle)
  .delete(articleController.checkID, articleController.deleteArticle);

module.exports = router;
