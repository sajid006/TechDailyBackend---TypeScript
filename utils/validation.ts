import * as bcrypt from 'bcrypt';
import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import stories from '../models/storyModel';
import users from '../models/userModel';
import AppError from './appError';
import catchAsync from './catchAsync';
import sendResponse from './contentNegotiation';
const generateToken = (username: any) => {
  return jwt.sign(
    {
      username,
    },
    process.env.JWT_SECRET as string,
    {
      expiresIn: '50d',
    }
  );
};

const decodeToken = (req: Request, res: Response) => {
  // check if authorization token is available
  let token;
  console.log(req.headers);
  console.log(req.headers.authorization);
  if (req.headers.authorization) {
    token = req.headers.authorization.split(' ')[1];
  } else {
    return '';
  }
  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);
    return decoded.username;
  } catch {
    return '';
  }
};
const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const username = decodeToken(req, res);
  return res.send(username);
};
const logoutUser = (req: Request, res: Response, next: NextFunction) => {
  //res.cookie('user', '', { httpOnly: true, maxAge: 0 });
  return res.send('');
};
const checkTokenUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const usernameFromToken = decodeToken(req, res);
  if (!usernameFromToken) {
    return next(new AppError('Your token does not contain any user', 401));
  }
  // check if the user is available
  const userFromToken = await users.findAll({
    where: { username: usernameFromToken },
  });
  if (userFromToken.length == 0) {
    return next(new AppError('The user for this token does not exist', 401));
  }

  // check if the user is the same as the one trying to update/delete the user
  if (!req.params.id || req.params.id !== usernameFromToken) {
    return next(new AppError('You are not authorized', 401));
  }

  req.body.username = usernameFromToken;
  next();
});

const checkTokenStory = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const usernameFromToken = decodeToken(req, res);
  if (!usernameFromToken) {
    return next(new AppError('Your token does not contain any user', 401));
  }
  // check if the user is available
  const userFromToken = await users.findAll({
    where: { username: usernameFromToken },
  });
  if (userFromToken.length == 0) {
    return next(new AppError('The user for this token does not exist', 401));
  }

  // check if the user is the same as the one trying to update/delete the user

  let usernameFromReq;
  if (!req.body.username && !req.params.id) return next(new AppError('Please provide a username or story id', 401));
  if (req.body.username) usernameFromReq = req.body.username;
  else {
    const storyList = await stories.findAll({
      where: { id: req.params.id },
    });
    const story: any = storyList[0];
    usernameFromReq = story.username;
  }
  if (usernameFromReq !== usernameFromToken) {
    return next(new AppError('You are not authorized', 401));
  }

  req.body.username = usernameFromToken;
  next();
});

const validatetUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const username = req.body.username;
  const password = req.body.password;
  if (!username || !password) {
    return next(new AppError('Please provide username and password', 400));
  }
  console.log(username);
  const userList = await users.findAll({
    where: { username },
  });
  if (userList.length == 0) return next(new AppError('Authentication failed', 401));
  const user: any = userList[0];
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) return next(new AppError('Authentication faileddd', 401));
  const token = generateToken(user.username);
  const messageWithUsername = { message: 'Login Successfull', username: username, token: token };
  //res.cookie('user', token, { httpOnly: true });
  sendResponse(req, res, messageWithUsername, 201);
});

const validation = {
  generateToken,
  checkTokenUser,
  checkTokenStory,
  validatetUser,
  verifyToken,
  logoutUser,
};
export default validation;
