const express = require('express');
const articleController = require("../controllers/articleController");
const checkLogin = require("../utils/validation");
const articleAuthMiddleware = require("../middlewares/articleAuthMiddleware");

const router = express.Router();

//router.param('id',articleController.checkID);
router
  .route('/')
  .get(articleController.getAllArticles)
  .post(checkLogin.checkToken, articleAuthMiddleware.checkBody, articleController.postArticle);

router
  .route('/:id')
  .get(articleAuthMiddleware.checkID ,articleController.getOneArticle)
  .patch(articleAuthMiddleware.checkID, articleAuthMiddleware.checkBody, articleController.patchArticle)
  .delete(articleAuthMiddleware.checkID, articleController.deleteArticle);

module.exports = router;
