const articleController = require('../../controllers/articleController');
const services = require('../../services/articleServices');
const contentNegotiation = require('../../utils/contentNegotiation');
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

describe('Testilng all functions of articleController', () => {
  beforeEach(() => {
    jest.spyOn(contentNegotiation, 'sendResponse').mockImplementation((req, res, inputData, statuscode) => {
      res.setHeader('Content-type', req.headers.accept);
      res.statusCode = statuscode || 200;
      return res.json(inputData);
    });
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  test('Testing getAllarticles', async () => {
    jest.spyOn(services, 'findAllArticles').mockReturnValue(myArticles);
    const mreq = httpMocks.createRequest({
      headers: {
        accept: 'application/json',
      },
    });
    const mres = httpMocks.createResponse();
    const mnext = jest.fn();
    const mystatus = 200;
    await articleController.getAllArticles(mreq, mres, mnext);
    const mresdata = mres._getJSONData();
    expect(services.findAllArticles).toHaveBeenCalledTimes(1);
    expect(services.findAllArticles).toHaveBeenCalledWith();
    expect(contentNegotiation.sendResponse).toHaveBeenCalledTimes(1);
    expect(contentNegotiation.sendResponse).toHaveBeenCalledWith(mreq, mres, myArticles);
    expect(mres.statusCode).toBe(mystatus);
    expect(mresdata).toEqual(myArticles);
    expect(mres._headers['content-type']).toBe(mreq.headers.accept);
  });
  test('Testing getArticle', async () => {
    jest.spyOn(services, 'findOneArticle').mockReturnValue(myArticles[0]);
    const mreq = httpMocks.createRequest({
      headers: {
        accept: 'application/json',
      },
      params: {
        id: myArticles[0].id,
      },
    });
    const mres = httpMocks.createResponse();
    const mnext = jest.fn();
    const mystatus = 200;
    await articleController.getArticle(mreq, mres, mnext);
    const mresdata = mres._getJSONData();
    expect(services.findOneArticle).toHaveBeenCalledTimes(1);
    expect(services.findOneArticle).toHaveBeenCalledWith(myArticles[0].id);
    expect(contentNegotiation.sendResponse).toHaveBeenCalledTimes(1);
    expect(contentNegotiation.sendResponse).toHaveBeenCalledWith(mreq, mres, myArticles[0]);
    expect(mres.statusCode).toBe(mystatus);
    expect(mresdata).toEqual(myArticles[0]);
    expect(mres._headers['content-type']).toBe(mreq.headers.accept);
  });
  test('Testing postArticle', async () => {
    jest.spyOn(services, 'createArticle').mockImplementation((articledata) => {
      return articledata;
    });
    const mreq = httpMocks.createRequest({
      headers: {
        accept: 'application/json',
      },
      body: {
        ...myArticles[0],
      },
    });
    const createdArticle = {
      title: myArticles[0].title,
      username: myArticles[0].username,
      description: myArticles[0].description,
      rating: myArticles[0].rating,
    };
    const mres = httpMocks.createResponse();
    const mnext = jest.fn();
    const mystatus = 201;
    await articleController.postArticle(mreq, mres, mnext);
    const mresdata = mres._getJSONData();
    expect(services.createArticle).toHaveBeenCalledTimes(1);
    expect(services.createArticle).toHaveBeenCalledWith(createdArticle);
    expect(contentNegotiation.sendResponse).toHaveBeenCalledTimes(1);
    expect(contentNegotiation.sendResponse).toHaveBeenCalledWith(mreq, mres, createdArticle, mystatus);
    expect(mres.statusCode).toBe(mystatus);
    expect(mresdata).toEqual(createdArticle);
    expect(mres._headers['content-type']).toBe(mreq.headers.accept);
  });
  test('Testing patchArticle', async () => {
    jest.spyOn(services, 'updateArticle').mockReturnValue(1);
    const mreq = httpMocks.createRequest({
      headers: {
        accept: 'application/json',
      },
      params: {
        id: myArticles[0].id,
      },
      body: {
        title: myArticles[0].title,
      },
    });
    const mres = httpMocks.createResponse();
    const mnext = jest.fn();
    const mystatus = 200;
    await articleController.patchArticle(mreq, mres, mnext);
    const mresdata = mres._getJSONData();
    expect(services.updateArticle).toHaveBeenCalledTimes(1);
    expect(services.updateArticle).toHaveBeenCalledWith(myArticles[0].id, myArticles[0].title);
    expect(contentNegotiation.sendResponse).toHaveBeenCalledTimes(1);
    expect(contentNegotiation.sendResponse).toHaveBeenCalledWith(mreq, mres, 1);
    expect(mres.statusCode).toBe(mystatus);
    expect(mresdata).toEqual(1);
    expect(mres._headers['content-type']).toBe(mreq.headers.accept);
  });
  test('Testing deleteArticle', async () => {
    jest.spyOn(services, 'removeArticle').mockReturnValue();
    const mreq = httpMocks.createRequest({
      params: {
        id: myArticles[0].id,
      },
    });
    const mres = httpMocks.createResponse();
    const mnext = jest.fn();
    const mystatus = 204;
    await articleController.deleteArticle(mreq, mres, mnext);
    //const mresdata = mres._getJSONData();
    expect(services.removeArticle).toHaveBeenCalledTimes(1);
    expect(services.removeArticle).toHaveBeenCalledWith(myArticles[0].id);
    expect(mres.statusCode).toBe(mystatus);
    expect(mres._getJSONData()).toEqual({});
  });
});
