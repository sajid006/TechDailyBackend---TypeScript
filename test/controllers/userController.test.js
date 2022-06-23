const userController = require('../../controllers/userController');
const services = require('../../services/userServices');
const contentNegotiation = require('../../utils/contentNegotiation');
const validation = require('../../utils/validation');
const httpMocks = require('node-mocks-http');
const bcrypt = require('bcrypt');
const myUsers = [
  {
    username: 'hogs',
    name: 'mnxcz',
    email: 'dklfs@y.com',
    password: '$2b$10$dmF.CY9.muWjaTVCAgaFuupu/zaK2hpBv.ZcZFTY3nw6eQ91jq/FC',
    createdAt: '2022-06-17T03:21:57.000Z',
    updatedAt: '2022-06-17T03:25:27.000Z',
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
    jest.spyOn(services, 'findAllUsers').mockReturnValue(myUsers);
    const mreq = httpMocks.createRequest();
    const mres = httpMocks.createResponse();
    const mnext = jest.fn();
    const mystatus = 200;
    await userController.getAllUsers(mreq, mres, mnext);
    const mresdata = mres._getJSONData();
    expect(services.findAllUsers).toHaveBeenCalledTimes(1);
    expect(services.findAllUsers).toHaveBeenCalledWith();
    expect(contentNegotiation.sendResponse).toHaveBeenCalledTimes(1);
    expect(contentNegotiation.sendResponse).toHaveBeenCalledWith(mreq, mres, myUsers);
    expect(mres.statusCode).toBe(mystatus);
    expect(mresdata).toEqual(myUsers);
  });
  test('Testing getUser', async () => {
    jest.spyOn(services, 'findOneUser').mockReturnValue(myUsers[0]);
    const mreq = httpMocks.createRequest({
      params: {
        id: myUsers[0].username,
      },
    });
    const mres = httpMocks.createResponse();
    const mnext = jest.fn();
    const mystatus = 200;
    await userController.getUser(mreq, mres, mnext);
    const mresdata = mres._getJSONData();
    expect(services.findOneUser).toHaveBeenCalledTimes(1);
    expect(services.findOneUser).toHaveBeenCalledWith(myUsers[0].username);
    expect(contentNegotiation.sendResponse).toHaveBeenCalledTimes(1);
    expect(contentNegotiation.sendResponse).toHaveBeenCalledWith(mreq, mres, myUsers[0]);
    expect(mres.statusCode).toBe(mystatus);
    expect(mresdata).toEqual(myUsers[0]);
  });
  test('Testing postUser', async () => {
    jest.spyOn(bcrypt, 'hash').mockImplementation((password) => {
      return password;
    });
    jest.spyOn(services, 'createUser').mockImplementation((userdata) => {
      const returnData = {};
      returnData.username = userdata.username;
      returnData.dataValues = { ...userdata };
      return returnData;
    });
    jest.spyOn(validation, 'generateToken').mockImplementation((inputData) => {
      return 'sajid' + inputData + 'hasan';
    });
    const accessToken = 'sajid' + myUsers[0].username + 'hasan';
    const userWithToken = { ...myUsers[0], accessToken };
    delete userWithToken.createdAt;
    delete userWithToken.updatedAt;
    const mreq = httpMocks.createRequest({
      body: {
        ...myUsers[0],
      },
    });
    const mres = httpMocks.createResponse();
    const mnext = jest.fn();
    const mystatus = 201;
    await userController.postUser(mreq, mres, mnext);
    const mresdata = mres._getJSONData();
    expect(bcrypt.hash).toHaveBeenCalledTimes(1);
    expect(bcrypt.hash).toHaveBeenCalledWith(myUsers[0].password, 10);
    expect(services.createUser).toHaveBeenCalledTimes(1);
    expect(services.createUser).toHaveBeenCalledWith(
      expect.objectContaining({
        email: myUsers[0].email,
        name: myUsers[0].name,
        username: myUsers[0].username,
        password: myUsers[0].password,
      })
    );
    expect(validation.generateToken).toHaveBeenCalledTimes(1);
    expect(validation.generateToken).toHaveBeenCalledWith(myUsers[0].username);
    expect(contentNegotiation.sendResponse).toHaveBeenCalledTimes(1);
    expect(contentNegotiation.sendResponse).toHaveBeenCalledWith(mreq, mres, userWithToken, mystatus);
    expect(mres.statusCode).toBe(mystatus);
    expect(mresdata).toEqual(userWithToken);
  });
  test('Testing patchUser', async () => {
    jest.spyOn(services, 'updateUser').mockReturnValue(1);
    const mreq = httpMocks.createRequest({
      params: {
        id: myUsers[0].username,
      },
      body: {
        email: myUsers[0].email,
        name: myUsers[0].name,
      },
    });
    const mres = httpMocks.createResponse();
    const mnext = jest.fn();
    const mystatus = 200;
    await userController.patchUser(mreq, mres, mnext);
    const mresdata = mres._getJSONData();
    expect(services.updateUser).toHaveBeenCalledTimes(1);
    expect(services.updateUser).toHaveBeenCalledWith(myUsers[0].username, myUsers[0].name, myUsers[0].email);
    expect(contentNegotiation.sendResponse).toHaveBeenCalledTimes(1);
    expect(contentNegotiation.sendResponse).toHaveBeenCalledWith(mreq, mres, 1);
    expect(mres.statusCode).toBe(mystatus);
    expect(mresdata).toEqual(1);
  });
  test('Testing deleteUser', async () => {
    jest.spyOn(services, 'removeUser').mockReturnValue();
    const mreq = httpMocks.createRequest({
      params: {
        id: myUsers[0].username,
      },
    });
    const mres = httpMocks.createResponse();
    const mnext = jest.fn();
    const mystatus = 204;
    await userController.deleteUser(mreq, mres, mnext);
    //const mresdata = mres._getJSONData();
    expect(services.removeUser).toHaveBeenCalledTimes(1);
    expect(services.removeUser).toHaveBeenCalledWith(myUsers[0].username);
    expect(mres.statusCode).toBe(mystatus);
    expect(mres._getJSONData()).toEqual({});
  });
});
