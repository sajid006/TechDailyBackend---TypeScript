const articleAuthMiddleware = require('../../middlewares/articleAuthMiddleware');
const services = require('../../services/articleServices');
const httpMocks = require('node-mocks-http');
const mArticles = require('../mockData/mArticles');

describe('Testilng all functions of articleAuthMiddleware', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  test('Testing checkID for right', async () => {
    jest.spyOn(services, 'validateID').mockReturnValue(1);
    const mreq = httpMocks.createRequest({
      params: {
        id: mArticles[0].id,
      },
    });
    const mres = httpMocks.createResponse();
    const mnext = jest.fn();
    await articleAuthMiddleware.checkID(mreq, mres, mnext);
    expect(services.validateID).toHaveBeenCalledTimes(1);
    expect(services.validateID).toHaveBeenCalledWith(mArticles[0].id);
    expect(mres.statusCode).not.toBe(404);
    expect(mnext).toHaveBeenCalledTimes(1);
  });
  test('Testing checkID for wrong', async () => {
    jest.spyOn(services, 'validateID').mockReturnValue(0);
    const mreq = httpMocks.createRequest({
      params: {
        id: mArticles[0].id,
      },
    });
    const mres = httpMocks.createResponse();
    const mnext = jest.fn();
    await articleAuthMiddleware.checkID(mreq, mres, mnext);
    expect(services.validateID).toHaveBeenCalledTimes(1);
    expect(services.validateID).toHaveBeenCalledWith(mArticles[0].id);
    expect(mres.statusCode).toBe(404);
    expect(mnext).toHaveBeenCalledTimes(0);
  });
  test('Testing checkBody for right', async () => {
    const mreq = httpMocks.createRequest({
      body: {
        title: mArticles[0].title,
        description: mArticles[0].description,
      },
    });
    const mres = httpMocks.createResponse();
    const mnext = jest.fn();
    await articleAuthMiddleware.checkBody(mreq, mres, mnext);
    expect(mres.statusCode).not.toBe(400);
    expect(mnext).toHaveBeenCalledTimes(1);
  });
  test('Testing checkBody for wrong', async () => {
    const mreq = httpMocks.createRequest();
    const mres = httpMocks.createResponse();
    const mnext = jest.fn();
    await articleAuthMiddleware.checkBody(mreq, mres, mnext);
    expect(mres.statusCode).toBe(400);
    expect(mnext).toHaveBeenCalledTimes(0);
  });
});
