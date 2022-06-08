const express = require('express');
const userController = require('../controllers/userController');
const checkLogin = require('../controllers/checkLogin');
const userAuthMiddleware = require('../middlewares/userAuthMiddleware')

const router = express.Router();

router
  .route('/')
  .get(userController.getAllUsers)
  .post(userAuthMiddleware.checkBody, userController.postUser);

router
  .route('/:id')
  .get(userAuthMiddleware.checkID, userController.getOneUser)
  .patch(
    userAuthMiddleware.checkID,
    userAuthMiddleware.checkBody,
    userController.patchUser
  )
  .delete(userAuthMiddleware.checkID, userController.deleteUser);

router
  .route('/login')
  .post(userAuthMiddleware.checkBody, checkLogin.validatetUser);

module.exports = router;
