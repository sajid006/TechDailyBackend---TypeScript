const storyController = require('../../controllers/storyController');
const services = require('../../services/storyServices');
const contentNegotiation = require('../../utils/contentNegotiation');
const httpMocks = require('node-mocks-http');
const mStories = require('../mockData/mStories');

describe('Testilng all functions of storyController', () => {
  beforeEach(() => {
    jest.spyOn(contentNegotiation, 'sendResponse').mockImplementation((req, res, inputData, statuscode) => {
      res.statusCode = statuscode || 200;
      return res.json(inputData);
    });
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  test('Testing getAllStories', async () => {
    jest.spyOn(services, 'findAllStories').mockReturnValue(mStories);
    const mreq = httpMocks.createRequest({});
    const mres = httpMocks.createResponse();
    const mnext = jest.fn();
    const mstatus = 200;
    await storyController.getAllStories(mreq, mres, mnext);
    const mresdata = mres._getJSONData();
    expect(services.findAllStories).toHaveBeenCalledTimes(1);
    expect(services.findAllStories).toHaveBeenCalledWith();
    expect(contentNegotiation.sendResponse).toHaveBeenCalledTimes(1);
    expect(contentNegotiation.sendResponse).toHaveBeenCalledWith(mreq, mres, mStories);
    expect(mres.statusCode).toBe(mstatus);
    expect(mresdata).toEqual(mStories);
  });
  test('Testing getUserStories', async () => {
    jest.spyOn(services, 'findUserStories').mockReturnValue(mStories[0]);
    const mreq = httpMocks.createRequest({
      params: {
        id: mStories[0].username,
      },
    });
    const mres = httpMocks.createResponse();
    const mnext = jest.fn();
    const mstatus = 200;
    await storyController.getUserStories(mreq, mres, mnext);
    const mresdata = mres._getJSONData();
    expect(services.findUserStories).toHaveBeenCalledTimes(1);
    expect(services.findUserStories).toHaveBeenCalledWith(mStories[0].username);
    expect(contentNegotiation.sendResponse).toHaveBeenCalledTimes(1);
    expect(contentNegotiation.sendResponse).toHaveBeenCalledWith(mreq, mres, mStories[0]);
    expect(mres.statusCode).toBe(mstatus);
    expect(mresdata).toEqual(mStories[0]);
  });
  test('Testing getSearchedStories', async () => {
    jest.spyOn(services, 'findSearchedStories').mockReturnValue(mStories[0]);
    const mreq = httpMocks.createRequest({
      params: {
        id: mStories[0].title,
      },
    });
    const mres = httpMocks.createResponse();
    const mnext = jest.fn();
    const mstatus = 200;
    await storyController.getSearchedStories(mreq, mres, mnext);
    const mresdata = mres._getJSONData();
    expect(services.findSearchedStories).toHaveBeenCalledTimes(1);
    expect(services.findSearchedStories).toHaveBeenCalledWith(mStories[0].title);
    expect(contentNegotiation.sendResponse).toHaveBeenCalledTimes(1);
    expect(contentNegotiation.sendResponse).toHaveBeenCalledWith(mreq, mres, mStories[0]);
    expect(mres.statusCode).toBe(mstatus);
    expect(mresdata).toEqual(mStories[0]);
  });
  test('Testing getStory', async () => {
    jest.spyOn(services, 'findOneStory').mockReturnValue(mStories[0]);
    const mreq = httpMocks.createRequest({
      params: {
        id: mStories[0].id,
      },
    });
    const mres = httpMocks.createResponse();
    const mnext = jest.fn();
    const mstatus = 200;
    await storyController.getStory(mreq, mres, mnext);
    const mresdata = mres._getJSONData();
    expect(services.findOneStory).toHaveBeenCalledTimes(1);
    expect(services.findOneStory).toHaveBeenCalledWith(mStories[0].id);
    expect(contentNegotiation.sendResponse).toHaveBeenCalledTimes(1);
    expect(contentNegotiation.sendResponse).toHaveBeenCalledWith(mreq, mres, mStories[0]);
    expect(mres.statusCode).toBe(mstatus);
    expect(mresdata).toEqual(mStories[0]);
  });
  test('Testing postStory', async () => {
    jest.spyOn(services, 'createStory').mockImplementation((storydata) => {
      return storydata;
    });
    const mreq = httpMocks.createRequest({
      body: {
        ...mStories[0],
      },
    });
    const createdStory = {
      title: mStories[0].title,
      username: mStories[0].username,
      description: mStories[0].description,
      rating: mStories[0].rating,
    };
    const mres = httpMocks.createResponse();
    const mnext = jest.fn();
    const mstatus = 201;
    await storyController.postStory(mreq, mres, mnext);
    const mresdata = mres._getJSONData();
    expect(services.createStory).toHaveBeenCalledTimes(1);
    expect(services.createStory).toHaveBeenCalledWith(createdStory);
    expect(contentNegotiation.sendResponse).toHaveBeenCalledTimes(1);
    expect(contentNegotiation.sendResponse).toHaveBeenCalledWith(mreq, mres, createdStory, mstatus);
    expect(mres.statusCode).toBe(mstatus);
    expect(mresdata).toEqual(createdStory);
  });
  test('Testing patchStory', async () => {
    jest.spyOn(services, 'updateStory').mockReturnValue(1);
    const mreq = httpMocks.createRequest({
      params: {
        id: mStories[0].id,
      },
      body: {
        title: mStories[0].title,
        description: mStories[0].description,
      },
    });
    const mres = httpMocks.createResponse();
    const mnext = jest.fn();
    const mstatus = 200;
    await storyController.patchStory(mreq, mres, mnext);
    const mresdata = mres._getJSONData();
    expect(services.updateStory).toHaveBeenCalledTimes(1);
    expect(services.updateStory).toHaveBeenCalledWith(mStories[0].id, mStories[0].title, mStories[0].description);
    expect(contentNegotiation.sendResponse).toHaveBeenCalledTimes(1);
    expect(contentNegotiation.sendResponse).toHaveBeenCalledWith(mreq, mres, 1);
    expect(mres.statusCode).toBe(mstatus);
    expect(mresdata).toEqual(1);
  });
  test('Testing deleteStory', async () => {
    jest.spyOn(services, 'removeStory').mockReturnValue();
    const mreq = httpMocks.createRequest({
      params: {
        id: mStories[0].id,
      },
    });
    const mres = httpMocks.createResponse();
    const mnext = jest.fn();
    const mstatus = 204;
    await storyController.deleteStory(mreq, mres, mnext);
    //const mresdata = mres._getJSONData();
    expect(services.removeStory).toHaveBeenCalledTimes(1);
    expect(services.removeStory).toHaveBeenCalledWith(mStories[0].id);
    expect(mres.statusCode).toBe(mstatus);
    expect(mres._getJSONData()).toEqual({});
  });
});
