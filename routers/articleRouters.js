const express = require('express');
const articleController = require("../controllers/articleController");
const validation = require("../utils/validation");
const articleAuthMiddleware = require("../middlewares/articleAuthMiddleware");

const router = express.Router();

//router.param('id',articleController.checkID);
router
  .route('/')
  .get(articleController.getAllArticles)
  .post(validation.checkToken, articleAuthMiddleware.checkBody, articleController.postArticle);

router
  .route('/:id')
  .get(articleAuthMiddleware.checkID ,articleController.getOneArticle)
  .patch(articleAuthMiddleware.checkID, validation.checkToken, articleAuthMiddleware.checkBody, articleController.patchArticle)
  .delete(articleAuthMiddleware.checkID, validation.checkToken, articleController.deleteArticle);

module.exports = router;
