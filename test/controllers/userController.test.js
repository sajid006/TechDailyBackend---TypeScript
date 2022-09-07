const userController = require('../../controllers/userController');
const services = require('../../services/userServices');
const contentNegotiation = require('../../utils/contentNegotiation');
const validation = require('../../utils/validation');
const httpMocks = require('node-mocks-http');
const bcrypt = require('bcrypt');
const mUsers = require('../mockData/mUsers');

describe('Testilng all functions of userController', () => {
  beforeEach(() => {
    jest.spyOn(contentNegotiation, 'sendResponse').mockImplementation((req, res, inputData, statuscode) => {
      res.statusCode = statuscode || 200;
      return res.json(inputData);
    });
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  test('Testing getAllUsers', async () => {
    jest.spyOn(services, 'findAllUsers').mockReturnValue(mUsers);
    const mreq = httpMocks.createRequest();
    const mres = httpMocks.createResponse();
    const mnext = jest.fn();
    const mstatus = 200;
    await userController.getAllUsers(mreq, mres, mnext);
    const mresdata = mres._getJSONData();
    expect(services.findAllUsers).toHaveBeenCalledTimes(1);
    expect(services.findAllUsers).toHaveBeenCalledWith();
    expect(contentNegotiation.sendResponse).toHaveBeenCalledTimes(1);
    expect(contentNegotiation.sendResponse).toHaveBeenCalledWith(mreq, mres, mUsers);
    expect(mres.statusCode).toBe(mstatus);
    expect(mresdata).toEqual(mUsers);
  });
  test('Testing getUser', async () => {
    jest.spyOn(services, 'findOneUser').mockReturnValue(mUsers[0]);
    const mreq = httpMocks.createRequest({
      params: {
        id: mUsers[0].username,
      },
    });
    const mres = httpMocks.createResponse();
    const mnext = jest.fn();
    const mstatus = 200;
    await userController.getUser(mreq, mres, mnext);
    const mresdata = mres._getJSONData();
    expect(services.findOneUser).toHaveBeenCalledTimes(1);
    expect(services.findOneUser).toHaveBeenCalledWith(mUsers[0].username);
    expect(contentNegotiation.sendResponse).toHaveBeenCalledTimes(1);
    expect(contentNegotiation.sendResponse).toHaveBeenCalledWith(mreq, mres, mUsers[0]);
    expect(mres.statusCode).toBe(mstatus);
    expect(mresdata).toEqual(mUsers[0]);
  });
  test('Testing postUser', async () => {
    jest.spyOn(bcrypt, 'hash').mockImplementation((password) => {
      return password;
    });
    jest.spyOn(services, 'createUser').mockImplementation((userdata) => {
      const returnData = {};
      returnData.email = userdata.email;
      returnData.name = userdata.name;
      returnData.password = userdata.password;
      returnData.username = userdata.username;
      return returnData;
    });
    jest.spyOn(validation, 'generateToken').mockImplementation((inputData) => {
      return 'sajid' + inputData + 'hasan';
    });
    //const accessToken = 'sajid' + mUsers[0].username + 'hasan';
    const userWithToken = { ...mUsers[0] };
    delete userWithToken.createdAt;
    delete userWithToken.updatedAt;
    const mreq = httpMocks.createRequest({
      body: {
        ...mUsers[0],
      },
    });
    const mres = httpMocks.createResponse();
    const mnext = jest.fn();
    const mstatus = 201;
    await userController.postUser(mreq, mres, mnext);
    const mresdata = mres._getJSONData();
    expect(bcrypt.hash).toHaveBeenCalledTimes(1);
    expect(bcrypt.hash).toHaveBeenCalledWith(mUsers[0].password, 10);
    expect(services.createUser).toHaveBeenCalledTimes(1);
    expect(services.createUser).toHaveBeenCalledWith(
      expect.objectContaining({
        email: mUsers[0].email,
        name: mUsers[0].name,
        username: mUsers[0].username,
        password: mUsers[0].password,
      })
    );
    expect(validation.generateToken).toHaveBeenCalledTimes(1);
    expect(validation.generateToken).toHaveBeenCalledWith(mUsers[0].username);
    expect(contentNegotiation.sendResponse).toHaveBeenCalledTimes(1);
    expect(contentNegotiation.sendResponse).toHaveBeenCalledWith(mreq, mres, userWithToken, mstatus);
    expect(mres.statusCode).toBe(mstatus);
    expect(mresdata).toEqual(userWithToken);
  });
  test('Testing patchUser', async () => {
    jest.spyOn(services, 'updateUser').mockReturnValue(1);
    const mreq = httpMocks.createRequest({
      params: {
        id: mUsers[0].username,
      },
      body: {
        email: mUsers[0].email,
        name: mUsers[0].name,
      },
    });
    const mres = httpMocks.createResponse();
    const mnext = jest.fn();
    const mstatus = 200;
    await userController.patchUser(mreq, mres, mnext);
    const mresdata = mres._getJSONData();
    expect(services.updateUser).toHaveBeenCalledTimes(1);
    expect(services.updateUser).toHaveBeenCalledWith(mUsers[0].username, mUsers[0].name, mUsers[0].email);
    expect(contentNegotiation.sendResponse).toHaveBeenCalledTimes(1);
    expect(contentNegotiation.sendResponse).toHaveBeenCalledWith(mreq, mres, 1);
    expect(mres.statusCode).toBe(mstatus);
    expect(mresdata).toEqual(1);
  });
  test('Testing deleteUser', async () => {
    jest.spyOn(services, 'removeUser').mockReturnValue();
    const mreq = httpMocks.createRequest({
      params: {
        id: mUsers[0].username,
      },
    });
    const mres = httpMocks.createResponse();
    const mnext = jest.fn();
    const mstatus = 204;
    await userController.deleteUser(mreq, mres, mnext);
    //const mresdata = mres._getJSONData();
    expect(services.removeUser).toHaveBeenCalledTimes(1);
    expect(services.removeUser).toHaveBeenCalledWith(mUsers[0].username);
    expect(mres.statusCode).toBe(mstatus);
    expect(mres._getJSONData()).toEqual({});
  });
});
