const articleController = require('../../controllers/articleController');
const services = require('../../services/articleServices');
const contentNegotiation = require('../../utils/contentNegotiation');
const httpMocks = require('node-mocks-http');
const mArticles = require('../mockData/mArticles');

describe('Testilng all functions of articleController', () => {
  beforeEach(() => {
    jest.spyOn(contentNegotiation, 'sendResponse').mockImplementation((req, res, inputData, statuscode) => {
      res.statusCode = statuscode || 200;
      return res.json(inputData);
    });
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  test('Testing getAllArticles', async () => {
    jest.spyOn(services, 'findAllArticles').mockReturnValue(mArticles);
    const mreq = httpMocks.createRequest({});
    const mres = httpMocks.createResponse();
    const mnext = jest.fn();
    const mstatus = 200;
    await articleController.getAllArticles(mreq, mres, mnext);
    const mresdata = mres._getJSONData();
    expect(services.findAllArticles).toHaveBeenCalledTimes(1);
    expect(services.findAllArticles).toHaveBeenCalledWith();
    expect(contentNegotiation.sendResponse).toHaveBeenCalledTimes(1);
    expect(contentNegotiation.sendResponse).toHaveBeenCalledWith(mreq, mres, mArticles);
    expect(mres.statusCode).toBe(mstatus);
    expect(mresdata).toEqual(mArticles);
  });
  test('Testing getUserArticles', async () => {
    jest.spyOn(services, 'findUserArticles').mockReturnValue(mArticles[0]);
    const mreq = httpMocks.createRequest({
      params: {
        id: mArticles[0].username,
      },
    });
    const mres = httpMocks.createResponse();
    const mnext = jest.fn();
    const mstatus = 200;
    await articleController.getUserArticles(mreq, mres, mnext);
    const mresdata = mres._getJSONData();
    expect(services.findUserArticles).toHaveBeenCalledTimes(1);
    expect(services.findUserArticles).toHaveBeenCalledWith(mArticles[0].username);
    expect(contentNegotiation.sendResponse).toHaveBeenCalledTimes(1);
    expect(contentNegotiation.sendResponse).toHaveBeenCalledWith(mreq, mres, mArticles[0]);
    expect(mres.statusCode).toBe(mstatus);
    expect(mresdata).toEqual(mArticles[0]);
  });
  test('Testing getSearchedArticles', async () => {
    jest.spyOn(services, 'findSearchedArticles').mockReturnValue(mArticles[0]);
    const mreq = httpMocks.createRequest({
      params: {
        id: mArticles[0].title,
      },
    });
    const mres = httpMocks.createResponse();
    const mnext = jest.fn();
    const mstatus = 200;
    await articleController.getSearchedArticles(mreq, mres, mnext);
    const mresdata = mres._getJSONData();
    expect(services.findSearchedArticles).toHaveBeenCalledTimes(1);
    expect(services.findSearchedArticles).toHaveBeenCalledWith(mArticles[0].title);
    expect(contentNegotiation.sendResponse).toHaveBeenCalledTimes(1);
    expect(contentNegotiation.sendResponse).toHaveBeenCalledWith(mreq, mres, mArticles[0]);
    expect(mres.statusCode).toBe(mstatus);
    expect(mresdata).toEqual(mArticles[0]);
  });
  test('Testing getArticle', async () => {
    jest.spyOn(services, 'findOneArticle').mockReturnValue(mArticles[0]);
    const mreq = httpMocks.createRequest({
      params: {
        id: mArticles[0].id,
      },
    });
    const mres = httpMocks.createResponse();
    const mnext = jest.fn();
    const mstatus = 200;
    await articleController.getArticle(mreq, mres, mnext);
    const mresdata = mres._getJSONData();
    expect(services.findOneArticle).toHaveBeenCalledTimes(1);
    expect(services.findOneArticle).toHaveBeenCalledWith(mArticles[0].id);
    expect(contentNegotiation.sendResponse).toHaveBeenCalledTimes(1);
    expect(contentNegotiation.sendResponse).toHaveBeenCalledWith(mreq, mres, mArticles[0]);
    expect(mres.statusCode).toBe(mstatus);
    expect(mresdata).toEqual(mArticles[0]);
  });
  test('Testing postArticle', async () => {
    jest.spyOn(services, 'createArticle').mockImplementation((articledata) => {
      return articledata;
    });
    const mreq = httpMocks.createRequest({
      body: {
        ...mArticles[0],
      },
    });
    const createdArticle = {
      title: mArticles[0].title,
      username: mArticles[0].username,
      description: mArticles[0].description,
      rating: mArticles[0].rating,
    };
    const mres = httpMocks.createResponse();
    const mnext = jest.fn();
    const mstatus = 201;
    await articleController.postArticle(mreq, mres, mnext);
    const mresdata = mres._getJSONData();
    expect(services.createArticle).toHaveBeenCalledTimes(1);
    expect(services.createArticle).toHaveBeenCalledWith(createdArticle);
    expect(contentNegotiation.sendResponse).toHaveBeenCalledTimes(1);
    expect(contentNegotiation.sendResponse).toHaveBeenCalledWith(mreq, mres, createdArticle, mstatus);
    expect(mres.statusCode).toBe(mstatus);
    expect(mresdata).toEqual(createdArticle);
  });
  test('Testing patchArticle', async () => {
    jest.spyOn(services, 'updateArticle').mockReturnValue(1);
    const mreq = httpMocks.createRequest({
      params: {
        id: mArticles[0].id,
      },
      body: {
        title: mArticles[0].title,
        description: mArticles[0].description,
      },
    });
    const mres = httpMocks.createResponse();
    const mnext = jest.fn();
    const mstatus = 200;
    await articleController.patchArticle(mreq, mres, mnext);
    const mresdata = mres._getJSONData();
    expect(services.updateArticle).toHaveBeenCalledTimes(1);
    expect(services.updateArticle).toHaveBeenCalledWith(mArticles[0].id, mArticles[0].title, mArticles[0].description);
    expect(contentNegotiation.sendResponse).toHaveBeenCalledTimes(1);
    expect(contentNegotiation.sendResponse).toHaveBeenCalledWith(mreq, mres, 1);
    expect(mres.statusCode).toBe(mstatus);
    expect(mresdata).toEqual(1);
  });
  test('Testing deleteArticle', async () => {
    jest.spyOn(services, 'removeArticle').mockReturnValue();
    const mreq = httpMocks.createRequest({
      params: {
        id: mArticles[0].id,
      },
    });
    const mres = httpMocks.createResponse();
    const mnext = jest.fn();
    const mstatus = 204;
    await articleController.deleteArticle(mreq, mres, mnext);
    //const mresdata = mres._getJSONData();
    expect(services.removeArticle).toHaveBeenCalledTimes(1);
    expect(services.removeArticle).toHaveBeenCalledWith(mArticles[0].id);
    expect(mres.statusCode).toBe(mstatus);
    expect(mres._getJSONData()).toEqual({});
  });
});
