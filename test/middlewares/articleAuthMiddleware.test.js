const articleAuthMiddleware = require('../../middlewares/articleAuthMiddleware');
const services = require('../../services/articleServices');
const httpMocks = require('node-mocks-http');

const myArticles = [
  {
    id: 1,
    username: 'sajid2',
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

describe('Testilng all functions of articleAuthMiddleware', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  test('Testing checkID for right', async () => {
    jest.spyOn(services, 'validateID').mockReturnValue(1);
    const mreq = httpMocks.createRequest({
      params: {
        id: myArticles[0].id,
      },
    });
    const mres = httpMocks.createResponse();
    const mnext = jest.fn();
    await articleAuthMiddleware.checkID(mreq, mres, mnext);
    expect(services.validateID).toHaveBeenCalledTimes(1);
    expect(services.validateID).toHaveBeenCalledWith(myArticles[0].id);
    expect(mres.statusCode).not.toBe(404);
  });
  test('Testing checkID for wrong', async () => {
    jest.spyOn(services, 'validateID').mockReturnValue(0);
    const mreq = httpMocks.createRequest({
      params: {
        id: myArticles[0].id,
      },
    });
    const mres = httpMocks.createResponse();
    const mnext = jest.fn();
    await articleAuthMiddleware.checkID(mreq, mres, mnext);
    expect(services.validateID).toHaveBeenCalledTimes(1);
    expect(services.validateID).toHaveBeenCalledWith(myArticles[0].id);
    expect(mres.statusCode).toBe(404);
  });
  test('Testing checkBody for right', async () => {
    const mreq = httpMocks.createRequest({
      body: {
        title: myArticles[0].title,
      },
    });
    const mres = httpMocks.createResponse();
    const mnext = jest.fn();
    await articleAuthMiddleware.checkBody(mreq, mres, mnext);
    expect(mres.statusCode).not.toBe(400);
  });
  test('Testing checkBody for wrong', async () => {
    const mreq = httpMocks.createRequest();
    const mres = httpMocks.createResponse();
    const mnext = jest.fn();
    await articleAuthMiddleware.checkBody(mreq, mres, mnext);
    expect(mres.statusCode).toBe(400);
  });
});
