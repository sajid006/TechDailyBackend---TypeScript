import { NextFunction, Request, Response } from 'express';
import services from '../services/storyServices';
import catchAsync from '../utils/catchAsync';
import sendResponse from '../utils/contentNegotiation';
const getAllStories = catchAsync(async (req: any, res: any) => {
  const allStories = await services.findAllStories();
  sendResponse(req, res, allStories);
});

const getUserStories = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  const userStories = await services.findUserStories(id);
  sendResponse(req, res, userStories);
});

const getSearchedStories = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  const userStories = await services.findSearchedStories(id);
  sendResponse(req, res, userStories);
});

const getStory = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const id: number = +req.params.id * 1;
  const myStory = await services.findOneStory(id);
  sendResponse(req, res, myStory);
});

const postStory = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const storyData = {
    username: req.body.username,
    title: req.body.title,
    description: req.body.description,
    rating: req.body.rating,
  };
  const newStory = await services.createStory(storyData);
  sendResponse(req, res, newStory, 201);
});

const patchStory = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const title = req.body.title;
  const id = req.params.id;
  const description = req.body.description;
  const myStory = await services.updateStory(id, title, description);
  sendResponse(req, res, myStory);
});

const deleteStory = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  await services.removeStory(id);
  res.status(204).json({});
});

const storyController = {
  getAllStories,
  getUserStories,
  getSearchedStories,
  getStory,
  postStory,
  patchStory,
  deleteStory,
};
export default storyController;
