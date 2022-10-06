const services = require('../services/storyServices');
const catchAsync = require('../utils/catchAsync');
const contentNegotiation = require('../utils/contentNegotiation');

exports.getAllStories = catchAsync(async (req, res, next) => {
  const allStories = await services.findAllStories();
  contentNegotiation.sendResponse(req, res, allStories);
});

exports.getUserStories = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const userStories = await services.findUserStories(id);
  contentNegotiation.sendResponse(req, res, userStories);
});

exports.getSearchedStories = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const userStories = await services.findSearchedStories(id);
  contentNegotiation.sendResponse(req, res, userStories);
});

exports.getStory = catchAsync(async (req, res, next) => {
  const id = req.params.id * 1;
  const myStory = await services.findOneStory(id);
  contentNegotiation.sendResponse(req, res, myStory);
});

exports.postStory = catchAsync(async (req, res, next) => {
  const storyData = {
    username: req.body.username,
    title: req.body.title,
    description: req.body.description,
    rating: req.body.rating,
  };
  const newStory = await services.createStory(storyData);
  contentNegotiation.sendResponse(req, res, newStory, 201);
});

exports.patchStory = catchAsync(async (req, res, next) => {
  const title = req.body.title;
  const id = req.params.id;
  const description = req.body.description;
  const myStory = await services.updateStory(id, title, description);
  contentNegotiation.sendResponse(req, res, myStory);
});

exports.deleteStory = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  await services.removeStory(id);
  res.status(204).json({});
});
