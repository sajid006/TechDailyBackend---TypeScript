import { NextFunction, Request, Response } from 'express';
import userServices from '../services/userServices';
import catchAsync from '../utils/catchAsync';
const checkUsername = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const value = req.params.id;
  const noOfUser = await userServices.validateUser(value);
  if (noOfUser < 1) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid Id',
    });
  }

  next();
});

const checkUpdateBody = (req: Request, res: Response, next: NextFunction) => {
  if (!req.body.email || !req.body.name) {
    return res.status(400).json({
      status: 'fail',
      message: 'name or email missing',
    });
  }
  next();
};

const checkPostBody = (req: Request, res: Response, next: NextFunction) => {
  if (!req.body.username) {
    return res.status(400).json({
      status: 'fail',
      message: 'Username missing',
    });
  }
  if (!req.body.name) {
    return res.status(400).json({
      status: 'fail',
      message: 'Name missing',
    });
  }
  if (!req.body.email) {
    return res.status(400).json({
      status: 'fail',
      message: 'Email missing',
    });
  }
  if (!req.body.password) {
    return res.status(400).json({
      status: 'fail',
      message: 'Password missing',
    });
  }
  if (req.body.password.length < 8) {
    return res.status(400).json({
      status: 'fail',
      message: 'Password length must be at least 8',
    });
  }
  next();
};
const userAuthMiddleware = {
  checkPostBody,
  checkUpdateBody,
  checkUsername,
};

export default userAuthMiddleware;
