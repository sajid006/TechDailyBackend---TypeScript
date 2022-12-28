import * as express from 'express';
import storyController from '../controllers/storyController';
import storyAuthMiddleware from '../middlewares/storyAuthMiddleware';
import validation from '../utils/validation';

const router = express.Router();

router
  .route('/')
  .get(storyController.getAllStories)
  .post(validation.checkTokenStory, storyAuthMiddleware.checkBody, storyController.postStory);

router
  .route('/:id')
  .get(storyAuthMiddleware.checkID, storyController.getStory)
  .patch(
    storyAuthMiddleware.checkID,
    validation.checkTokenStory,
    storyAuthMiddleware.checkBody,
    storyController.patchStory
  )
  .delete(storyAuthMiddleware.checkID, validation.checkTokenStory, storyController.deleteStory);
router.route('/search/:id').get(storyController.getSearchedStories);

export default router;
