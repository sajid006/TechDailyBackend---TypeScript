const httpMocks = require('node-mocks-http');
const userModel = require('../../models/userModel');
const articleModel = require('../../models/articleModel');
const contentNegotiation = require('../../utils/contentNegotiation');
const AppError = require('../../utils/appError');
const users = userModel.users;
const articles = articleModel.articles;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const validation = require('../../utils/validation');

const myArticles = [
  {
    id: 1,
    username: 'sajid1',
    title: 'Fourth',
    description: 'cvbnxc sdfdd dd sddd dfdfdfdfsdfffffffffffffff',
    rating: 1,
    createdAt: '2022-06-20T05:44:03.000Z',
    updatedAt: '2022-06-20T05:44:03.000Z',
  },
  {
    id: 2,
    username: 'sajid3',
    title: 'First',
    description: 'Hello cvbnxdfdfdc sdfdd dd sddd dfdfdfdfsdfffffffffffffff',
    rating: 2,
    createdAt: '2022-06-20T05:45:33.000Z',
    updatedAt: '2022-06-20T05:45:33.000Z',
  },
];

const myUsers = [
  {
    username: 'sajid1',
    name: 'Sajid Hasan',
    email: 'sajid1@id.com',
    password: '$2b$10$G.vWTLfgzdjo1JjpiJMO2.bUKXL/KvsuygBAd1QvWUepuoXpr8QK6',
    createdAt: '2022-06-21T06:08:44.000Z',
    updatedAt: '2022-06-21T06:08:44.000Z',
  },
  {
    username: 'sajid',
    name: 'Sajid Hasan',
    email: 'fwxxcai@d.com',
    password: '$2b$10$QjvZDwwRlqutEUeuuhdq1eGS/5mTBnjwdsXj2xbSKJ2XmpzccDR7y',
    createdAt: '2022-06-17T05:18:39.000Z',
    updatedAt: '2022-06-17T05:18:39.000Z',
  },
];
const wrongToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXNzd29yZCI6InNhamlkMSIsImlhdCI6MTY1NTk4NDU1MywiZXhwIjoxNjU2NDE2NTUzfQ.ytEnomDCnz5PvszZxjBQWDTsc6xTUDYzuOtR-NCNips';
const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNhamlkMSIsImlhdCI6MTY1NTk2MDM1NiwiZXhwIjoxNjU2MzkyMzU2fQ.98UiIpXxpggcMAYgFw7wb_SLar-sBoNDLgBU20D_CKs';
process.env.JWT_SECRET = 'xiaomi-redmi-note-ten-pro-max-ultra%';
process.env.JWT_EXPIRATION_TIME = '5d';
describe('Testilng only generateToken function', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  test('Testing a call in catchasync', async () => {
    jest.spyOn(users, 'findOne').mockReturnValue();
    const mreq = httpMocks.createRequest({
      headers: {
        authorization: 'Bearer Wrong',
      },
    });
    const mres = httpMocks.createResponse();
    const mnext = jest.fn();
    const myError = new jwt.JsonWebTokenError('jwt malformed');
    await validation.checkTokenUser(mreq, mres, mnext);
    expect(mnext).toHaveBeenCalledTimes(1);
    expect(mnext).toHaveBeenCalledWith(myError);
    expect(users.findOne).toHaveBeenCalledTimes(0);
  });
  test('Testing generateToken', async () => {
    jest.spyOn(jwt, 'sign').mockImplementation((object1, object2, object3) => {
      return object1.username + object2 + object3.expiresIn;
    });
    const token = await validation.generateToken(myUsers[0].username);
    expect(jwt.sign).toHaveBeenCalledTimes(1);
    expect(jwt.sign).toHaveBeenCalledWith(
      {
        username: myUsers[0].username,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRATION_TIME,
      }
    );
    expect(token).toBe(myUsers[0].username + process.env.JWT_SECRET + process.env.JWT_EXPIRATION_TIME);
  });
});

describe('Testing all cases of checkTokenUser', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  test('Testing else in decodeToken with no auth header', async () => {
    jest.spyOn(users, 'findOne').mockReturnValue(myUsers[0]);
    const mreq = httpMocks.createRequest({
      params: {
        id: myUsers[0].username,
      },
    });
    const mres = httpMocks.createResponse();
    const mnext = jest.fn();
    const myError = new AppError('Your token does not contain any user', 401);
    await validation.checkTokenUser(mreq, mres, mnext);
    expect(mnext).toHaveBeenCalledTimes(1);
    expect(mnext).toHaveBeenCalledWith(myError);
    expect(users.findOne).toHaveBeenCalledTimes(0);
  });
  test('Testing first if with token that has no username', async () => {
    jest.spyOn(users, 'findOne').mockReturnValue(myUsers[0]);
    const mreq = httpMocks.createRequest({
      params: {
        id: myUsers[0].username,
      },
      headers: {
        authorization: `Bearer ${wrongToken}`,
      },
    });
    const mres = httpMocks.createResponse();
    const mnext = jest.fn();
    const myError = new AppError('Your token does not contain any user', 401);
    await validation.checkTokenUser(mreq, mres, mnext);
    expect(mnext).toHaveBeenCalledTimes(1);
    expect(mnext).toHaveBeenCalledWith(myError);
    expect(users.findOne).toHaveBeenCalledTimes(0);
  });
  test('Testing second if', async () => {
    jest.spyOn(users, 'findOne').mockReturnValue();
    const mreq = httpMocks.createRequest({
      params: {
        id: myUsers[0].username,
      },
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    const mres = httpMocks.createResponse();
    const mnext = jest.fn();
    const myError = new AppError('The user for this token does not exist', 401);
    await validation.checkTokenUser(mreq, mres, mnext);
    expect(mnext).toHaveBeenCalledTimes(1);
    expect(mnext).toHaveBeenCalledWith(myError);
    expect(users.findOne).toHaveBeenCalledTimes(1);
    expect(users.findOne).toHaveBeenCalledWith({
      where: { username: myUsers[0].username },
    });
  });
  test('Testing third if first condition', async () => {
    jest.spyOn(users, 'findOne').mockReturnValue(myUsers[0]);
    const mreq = httpMocks.createRequest({
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    const mres = httpMocks.createResponse();
    const mnext = jest.fn();
    const myError = new AppError('You are not authorized', 401);
    await validation.checkTokenUser(mreq, mres, mnext);
    expect(mnext).toHaveBeenCalledTimes(1);
    expect(mnext).toHaveBeenCalledWith(myError);
    expect(users.findOne).toHaveBeenCalledTimes(1);
    expect(users.findOne).toHaveBeenCalledWith({
      where: { username: myUsers[0].username },
    });
  });
  test('Testing third if second condition', async () => {
    jest.spyOn(users, 'findOne').mockReturnValue(myUsers[0]);
    const mreq = httpMocks.createRequest({
      params: {
        id: myUsers[1].username,
      },
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    const mres = httpMocks.createResponse();
    const mnext = jest.fn();
    const myError = new AppError('You are not authorized', 401);
    await validation.checkTokenUser(mreq, mres, mnext);
    expect(mnext).toHaveBeenCalledTimes(1);
    expect(mnext).toHaveBeenCalledWith(myError);
    expect(users.findOne).toHaveBeenCalledTimes(1);
    expect(users.findOne).toHaveBeenCalledWith({
      where: { username: myUsers[0].username },
    });
  });
  test('Testing no error', async () => {
    jest.spyOn(users, 'findOne').mockReturnValue(myUsers[0]);
    const mreq = httpMocks.createRequest({
      params: {
        id: myUsers[0].username,
      },
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    const mres = httpMocks.createResponse();
    const mnext = jest.fn();
    await validation.checkTokenUser(mreq, mres, mnext);
    expect(users.findOne).toHaveBeenCalledTimes(1);
    expect(users.findOne).toHaveBeenCalledWith({
      where: { username: myUsers[0].username },
    });
    expect(mreq.username).toBe(myUsers[0].username);
    expect(mnext).toHaveBeenCalledTimes(1);
    expect(mnext).toHaveBeenCalledWith();
  });
});

describe('Testing all cases of checkTokenArticle', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  test('Testing first if with else in decodeToken with wrong auth header', async () => {
    jest.spyOn(users, 'findOne').mockReturnValue(myUsers[0]);
    const mreq = httpMocks.createRequest({
      params: {
        id: myUsers[0].username,
      },
      headers: {
        authorization: 'nothing',
      },
    });
    const mres = httpMocks.createResponse();
    const mnext = jest.fn();
    const myError = new AppError('Your token does not contain any user', 401);
    await validation.checkTokenArticle(mreq, mres, mnext);
    expect(mnext).toHaveBeenCalledTimes(1);
    expect(mnext).toHaveBeenCalledWith(myError);
    expect(users.findOne).toHaveBeenCalledTimes(0);
    expect(mreq.username).toBeFalsy();
  });
  test('Testing second if', async () => {
    jest.spyOn(users, 'findOne').mockReturnValue();
    const mreq = httpMocks.createRequest({
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    const mres = httpMocks.createResponse();
    const mnext = jest.fn();
    const myError = new AppError('The user for this token does not exist', 401);
    await validation.checkTokenArticle(mreq, mres, mnext);
    expect(users.findOne).toHaveBeenCalledTimes(1);
    expect(users.findOne).toHaveBeenCalledWith({
      where: { username: myUsers[0].username },
    });
    expect(mnext).toHaveBeenCalledTimes(1);
    expect(mnext).toHaveBeenCalledWith(myError);
    expect(mreq.username).toBeFalsy();
  });
  test('Testing third if', async () => {
    jest.spyOn(users, 'findOne').mockReturnValue(myUsers[0]);
    const mreq = httpMocks.createRequest({
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    const mres = httpMocks.createResponse();
    const mnext = jest.fn();
    const myError = new AppError('Please provide a username', 401);
    await validation.checkTokenArticle(mreq, mres, mnext);
    expect(users.findOne).toHaveBeenCalledTimes(1);
    expect(users.findOne).toHaveBeenCalledWith({
      where: { username: myUsers[0].username },
    });
    expect(mnext).toHaveBeenCalledTimes(1);
    expect(mnext).toHaveBeenCalledWith(myError);
    expect(mreq.username).toBeFalsy();
  });
  test('Testing fourth if', async () => {
    jest.spyOn(users, 'findOne').mockReturnValue(myUsers[0]);
    const mreq = httpMocks.createRequest({
      headers: {
        authorization: `Bearer ${token}`,
      },
      body: {
        username: myUsers[0].username,
      },
    });
    const mres = httpMocks.createResponse();
    const mnext = jest.fn();
    await validation.checkTokenArticle(mreq, mres, mnext);
    expect(users.findOne).toHaveBeenCalledTimes(1);
    expect(users.findOne).toHaveBeenCalledWith({
      where: { username: myUsers[0].username },
    });
    expect(mnext).toHaveBeenCalledTimes(1);
    expect(mnext).toHaveBeenCalledWith();
    expect(mreq.username).toBe(myUsers[0].username);
  });
  test('Testing fifth if', async () => {
    jest.spyOn(users, 'findOne').mockReturnValue(myUsers[0]);
    jest.spyOn(articles, 'findOne').mockReturnValue(myArticles[1]);
    const mreq = httpMocks.createRequest({
      headers: {
        authorization: `Bearer ${token}`,
      },
      params: {
        id: myArticles[0].id,
      },
    });
    const mres = httpMocks.createResponse();
    const mnext = jest.fn();
    const myError = new AppError('You are not authorized', 401);
    await validation.checkTokenArticle(mreq, mres, mnext);
    expect(users.findOne).toHaveBeenCalledTimes(1);
    expect(users.findOne).toHaveBeenCalledWith({
      where: { username: myUsers[0].username },
    });
    expect(articles.findOne).toHaveBeenCalledTimes(1);
    expect(articles.findOne).toHaveBeenCalledWith({
      where: { id: myArticles[0].id },
    });
    expect(mnext).toHaveBeenCalledTimes(1);
    expect(mnext).toHaveBeenCalledWith(myError);
    expect(mreq.username).toBeFalsy();
  });
  test('Testing no error', async () => {
    jest.spyOn(users, 'findOne').mockReturnValue(myUsers[0]);
    jest.spyOn(articles, 'findOne').mockReturnValue(myArticles[0]);
    const mreq = httpMocks.createRequest({
      params: {
        id: myArticles[0].id,
      },
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    const mres = httpMocks.createResponse();
    const mnext = jest.fn();
    await validation.checkTokenArticle(mreq, mres, mnext);
    expect(users.findOne).toHaveBeenCalledTimes(1);
    expect(users.findOne).toHaveBeenCalledWith({
      where: { username: myUsers[0].username },
    });
    expect(articles.findOne).toHaveBeenCalledTimes(1);
    expect(articles.findOne).toHaveBeenCalledWith({
      where: { id: myArticles[0].id },
    });
    expect(mreq.username).toBe(myUsers[0].username);
    expect(mnext).toHaveBeenCalledTimes(1);
    expect(mnext).toHaveBeenCalledWith();
  });
});

describe('Testing all cases of validateUser', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  test('Testing first if first condition', async () => {
    jest.spyOn(users, 'findOne').mockReturnValue(myUsers[0]);
    const mreq = httpMocks.createRequest({
      body: {
        password: myUsers[0].password,
      },
    });
    const mres = httpMocks.createResponse();
    const mnext = jest.fn();
    const myError = new AppError('Please provide username and password', 400);
    await validation.validatetUser(mreq, mres, mnext);
    expect(mnext).toHaveBeenCalledTimes(1);
    expect(mnext).toHaveBeenCalledWith(myError);
    expect(users.findOne).toHaveBeenCalledTimes(0);
  });
  test('Testing first if second condition', async () => {
    jest.spyOn(users, 'findOne').mockReturnValue(myUsers[0]);
    const mreq = httpMocks.createRequest({
      body: {
        username: myUsers[0].username,
      },
    });
    const mres = httpMocks.createResponse();
    const mnext = jest.fn();
    const myError = new AppError('Please provide username and password', 400);
    await validation.validatetUser(mreq, mres, mnext);
    expect(mnext).toHaveBeenCalledTimes(1);
    expect(mnext).toHaveBeenCalledWith(myError);
    expect(users.findOne).toHaveBeenCalledTimes(0);
  });
  test('Testing second if', async () => {
    jest.spyOn(users, 'findOne').mockReturnValue();
    jest.spyOn(bcrypt, 'compare').mockReturnValue(false);
    const mreq = httpMocks.createRequest({
      body: {
        username: myUsers[0].username,
        password: myUsers[0].password,
      },
    });
    const mres = httpMocks.createResponse();
    const mnext = jest.fn();
    const myError = new AppError('Authentication failed', 400);
    await validation.validatetUser(mreq, mres, mnext);
    expect(users.findOne).toHaveBeenCalledTimes(1);
    expect(users.findOne).toHaveBeenCalledWith({
      where: { username: myUsers[0].username },
    });
    expect(mnext).toHaveBeenCalledTimes(1);
    expect(mnext).toHaveBeenCalledWith(myError);
    expect(bcrypt.compare).toHaveBeenCalledTimes(0);
  });
  test('Testing third if', async () => {
    jest.spyOn(users, 'findOne').mockReturnValue(myUsers[0]);
    jest.spyOn(bcrypt, 'compare').mockImplementation((one, two) => {
      if (one == two) return true;
      else return false;
    });
    jest.spyOn(contentNegotiation, 'sendResponse').mockReturnValue();
    const mreq = httpMocks.createRequest({
      body: {
        username: myUsers[0].username,
        password: myUsers[1].password,
      },
    });
    const mres = httpMocks.createResponse();
    const mnext = jest.fn();
    const myError = new AppError('Authentication faileddd', 400);
    await validation.validatetUser(mreq, mres, mnext);
    expect(users.findOne).toHaveBeenCalledTimes(1);
    expect(users.findOne).toHaveBeenCalledWith({
      where: { username: myUsers[0].username },
    });
    expect(bcrypt.compare).toHaveBeenCalledTimes(1);
    expect(bcrypt.compare).toHaveBeenCalledWith(myUsers[1].password, myUsers[0].password);
    expect(mnext).toHaveBeenCalledTimes(1);
    expect(mnext).toHaveBeenCalledWith(myError);
    expect(contentNegotiation.sendResponse).toHaveBeenCalledTimes(0);
  });
  test('Testing no error', async () => {
    jest.spyOn(users, 'findOne').mockReturnValue(myUsers[0]);
    jest.spyOn(bcrypt, 'compare').mockImplementation((one, two) => {
      if (one == two) return true;
      else return false;
    });
    jest.spyOn(contentNegotiation, 'sendResponse').mockImplementation((req, res, inputData, statuscode) => {
      res.statusCode = statuscode || 200;
      return res.send(inputData);
    });
    const mreq = httpMocks.createRequest({
      body: {
        username: myUsers[0].username,
        password: myUsers[0].password,
      },
    });
    const mres = httpMocks.createResponse();
    const mnext = jest.fn();
    const mystatus = 201;
    await validation.validatetUser(mreq, mres, mnext);
    const mresdata = mres._getData();
    expect(users.findOne).toHaveBeenCalledTimes(1);
    expect(users.findOne).toHaveBeenCalledWith({
      where: { username: myUsers[0].username },
    });
    expect(bcrypt.compare).toHaveBeenCalledTimes(1);
    expect(bcrypt.compare).toHaveBeenCalledWith(myUsers[0].password, myUsers[0].password);
    expect(contentNegotiation.sendResponse).toHaveBeenCalledTimes(1);
    expect(contentNegotiation.sendResponse).toHaveBeenCalledWith(mreq, mres, expect.anything(), 201);
    expect(mres.statusCode).toBe(mystatus);
    expect(mresdata).toEqual({
      accessToken: myUsers[0].username + process.env.JWT_SECRET + process.env.JWT_EXPIRATION_TIME,
      message: 'Login Successfull',
    });
    expect(mnext).toHaveBeenCalledTimes(0);
  });
});
