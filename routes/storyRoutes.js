const express = require('express');
const storyController = require('../controllers/storyController');
const validation = require('../utils/validation');
const storyAuthMiddleware = require('../middlewares/storyAuthMiddleware');

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

module.exports = router;
