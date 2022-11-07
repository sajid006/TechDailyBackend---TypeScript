const express = require('express');
const userController = require('../controllers/userController');
const validation = require('../utils/validation');
const userAuthMiddleware = require('../middlewares/userAuthMiddleware');
const storyController = require('../controllers/storyController');

const router = express.Router();

router.route('/').get(userController.getAllUsers).post(userAuthMiddleware.checkPostBody, userController.postUser);
router.route('/verifyToken').post(validation.verifyToken);
router.route('/logout').get(validation.logoutUser);
router
  .route('/:id')
  .get(userAuthMiddleware.checkUsername, userController.getUser)
  .patch(
    validation.checkTokenUser,
    userAuthMiddleware.checkUsername,
    userAuthMiddleware.checkUpdateBody,
    userController.patchUser
  )
  .delete(validation.checkTokenUser, userAuthMiddleware.checkUsername, userController.deleteUser);

router.route('/login').post(validation.validatetUser);
router.route('/:id/stories').get(userAuthMiddleware.checkUsername, storyController.getUserStories);

module.exports = router;
