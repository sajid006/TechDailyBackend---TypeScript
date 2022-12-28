import { NextFunction, Request, Response } from 'express';
import storyServices from '../services/storyServices';
import catchAsync from '../utils/catchAsync';
const checkID = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const value = req.params.id;
  const noOfStory = await storyServices.validateID(value);
  if (noOfStory < 1) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid Id',
    });
  }
  next();
});

const checkBody = (req: Request, res: Response, next: NextFunction) => {
  if (!req.body.title || !req.body.description) {
    return res.status(400).json({
      status: 'fail',
      message: 'Title or description missing',
    });
  }
  next();
};

const storyAuthMiddleware = { checkID, checkBody };
export default storyAuthMiddleware;
