import * as express from 'express';
import storyController from '../controllers/storyController';
import userController from '../controllers/userController';
import userAuthMiddleware from '../middlewares/userAuthMiddleware';
import validation from '../utils/validation';

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

export default router;
