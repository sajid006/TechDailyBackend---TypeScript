import * as bcrypt from 'bcrypt';
import { NextFunction, Request, Response } from 'express';
import services from '../services/userServices';
import catchAsync from '../utils/catchAsync';
import sendResponse from '../utils/contentNegotiation';
import validation from '../utils/validation';

const getAllUsers = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const allUsers = await services.findAllUsers();
  sendResponse(req, res, allUsers);
});

const getUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  console.log(id);
  const myUser = await services.findOneUser(id);
  sendResponse(req, res, myUser);
});

const postUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const userData: any = {};
  userData.name = req.body.name;
  userData.email = req.body.email;
  userData.password = await bcrypt.hash(req.body.password, 10);
  userData.username = req.body.username;
  const newUser = await services.createUser(userData);
  const token = validation.generateToken(userData.username);
  //res.cookie('user', accessToken, { httpOnly: true });
  const userWithToken = { ...newUser, token };
  sendResponse(req, res, userWithToken, 201);
});

const patchUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const email = req.body.email;
  const name = req.body.name;
  const username = req.params.id;
  const myUser = await services.updateUser(username, name, email);
  sendResponse(req, res, myUser);
});

const deleteUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  await services.removeUser(id);
  res.status(204).json({});
});

const userController = {
  getAllUsers,
  getUser,
  postUser,
  patchUser,
  deleteUser,
};
export default userController;
