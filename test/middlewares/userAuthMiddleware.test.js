const userAuthMiddleware = require('../../middlewares/userAuthMiddleware');
const services = require('../../services/userServices');
const httpMocks = require('node-mocks-http');

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

describe('Testilng all functions of userAuthMiddleware', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  test('Testing checkUsername for right', async () => {
    jest.spyOn(services, 'validateUser').mockReturnValue(1);
    const mreq = httpMocks.createRequest({
      params: {
        id: myUsers[0].username,
      },
    });
    const mres = httpMocks.createResponse();
    const mnext = jest.fn();
    await userAuthMiddleware.checkUsername(mreq, mres, mnext);
    expect(services.validateUser).toHaveBeenCalledTimes(1);
    expect(services.validateUser).toHaveBeenCalledWith(myUsers[0].username);
    //expect(mres.statusCode).not.toBe(404);
    expect(mnext).toHaveBeenCalledTimes(1);
    expect(mnext).toHaveBeenCalledWith();
  });
  test('Testing checkUsername for wrong', async () => {
    jest.spyOn(services, 'validateUser').mockReturnValue(0);
    const mreq = httpMocks.createRequest({
      params: {
        id: myUsers[0].username,
      },
    });
    const mres = httpMocks.createResponse();
    const mnext = jest.fn();
    await userAuthMiddleware.checkUsername(mreq, mres, mnext);
    const mresdata = mres._getJSONData();
    expect(services.validateUser).toHaveBeenCalledTimes(1);
    expect(services.validateUser).toHaveBeenCalledWith(myUsers[0].username);
    expect(mres.statusCode).toBe(404);
    //expect(mnext).toHaveBeenCalledTimes(0);
    expect(mresdata).toEqual({
      status: 'fail',
      message: 'Invalid Id',
    });
  });
  test('Testing checkBody for right', async () => {
    const mreq = httpMocks.createRequest({
      body: {
        email: myUsers[0].email,
        name: myUsers[0].name,
      },
    });
    const mres = httpMocks.createResponse();
    const mnext = jest.fn();
    await userAuthMiddleware.checkBody(mreq, mres, mnext);
    //expect(mres.statusCode).not.toBe(400);
    expect(mnext).toHaveBeenCalledTimes(1);
    expect(mnext).toHaveBeenCalledWith();
  });
  test('Testing checkBody for wrong', async () => {
    const mreq = httpMocks.createRequest();
    const mres = httpMocks.createResponse();
    const mnext = jest.fn();
    await userAuthMiddleware.checkBody(mreq, mres, mnext);
    const mresdata = mres._getJSONData();
    expect(mres.statusCode).toBe(400);
    //expect(mnext).toHaveBeenCalledTimes(0);
    expect(mresdata).toEqual({
      status: 'fail',
      message: 'name or email missing',
    });
  });
});
