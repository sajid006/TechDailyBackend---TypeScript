const httpMocks = require('node-mocks-http');
const userModel = require('../../models/userModel');
const articleModel = require('../../models/articleModel');
const contentNegotiation = require('../../utils/contentNegotiation');
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
describe('Testilng all functions of validation', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  test('Testing generateToken', async () => {
    jest.spyOn(jwt, 'sign').mockImplementation((object1) => {
      return object1.username;
    });
    const token = await validation.generateToken(myUsers[0].username);
    expect(jwt.sign).toHaveBeenCalledTimes(1);
    expect(jwt.sign).toHaveBeenCalledWith(
      {
        username: myUsers[0].username,
      },
      undefined,
      {
        expiresIn: undefined,
      }
    );
    expect(token).toBe(myUsers[0].username);
  });
  test('Testing checkTokenUser', async () => {
    process.env.JWT_SECRET = 'xiaomi-redmi-note-ten-pro-max-ultra%';
    jest.spyOn(users, 'findOne').mockReturnValue(myUsers[0]);
    const mreq = httpMocks.createRequest({
      username: myUsers[0].username,
      headers: {
        authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNhamlkMSIsImlhdCI6MTY1NTk2MDM1NiwiZXhwIjoxNjU2MzkyMzU2fQ.98UiIpXxpggcMAYgFw7wb_SLar-sBoNDLgBU20D_CKs',
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
  });
  test('Testing checkTokenArticle', async () => {
    process.env.JWT_SECRET = 'xiaomi-redmi-note-ten-pro-max-ultra%';
    jest.spyOn(users, 'findOne').mockReturnValue(myUsers[0]);
    jest.spyOn(articles, 'findOne').mockReturnValue(myArticles[0]);
    const mreq = httpMocks.createRequest({
      params: {
        id: 1,
      },
      headers: {
        authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNhamlkMSIsImlhdCI6MTY1NTk2MDM1NiwiZXhwIjoxNjU2MzkyMzU2fQ.98UiIpXxpggcMAYgFw7wb_SLar-sBoNDLgBU20D_CKs',
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
  });
  test('Testing validateUser', async () => {
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
    expect(mresdata).toEqual({ accessToken: myUsers[0].username, message: 'Login Successfull' });
  });
});
