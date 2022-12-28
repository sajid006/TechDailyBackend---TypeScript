"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const storyController_1 = require("../controllers/storyController");
const storyAuthMiddleware_1 = require("../middlewares/storyAuthMiddleware");
const validation_1 = require("../utils/validation");
const router = express.Router();
router
    .route('/')
    .get(storyController_1.default.getAllStories)
    .post(validation_1.default.checkTokenStory, storyAuthMiddleware_1.default.checkBody, storyController_1.default.postStory);
router
    .route('/:id')
    .get(storyAuthMiddleware_1.default.checkID, storyController_1.default.getStory)
    .patch(storyAuthMiddleware_1.default.checkID, validation_1.default.checkTokenStory, storyAuthMiddleware_1.default.checkBody, storyController_1.default.patchStory)
    .delete(storyAuthMiddleware_1.default.checkID, validation_1.default.checkTokenStory, storyController_1.default.deleteStory);
router.route('/search/:id').get(storyController_1.default.getSearchedStories);
exports.default = router;
