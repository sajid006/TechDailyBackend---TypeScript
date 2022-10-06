const storyModel = require('../../models/storyModel');
const stories = storyModel.stories;
const storyServices = require('../../services/storyServices');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const mStories = require('../mockData/mStories');

describe('Testilng all functions of storyService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  test('Testing validateID for 1', async () => {
    jest.spyOn(stories, 'findOne').mockImplementation(() => {
      return mStories[0];
    });
    const valid = await storyServices.validateID(mStories[0].id);
    expect(stories.findOne).toHaveBeenCalledTimes(1);
    expect(stories.findOne).toHaveBeenCalledWith({
      where: {
        id: mStories[0].id,
      },
    });
    expect(valid).toEqual(1);
  });
  test('Testing validateID for 0', async () => {
    jest.spyOn(stories, 'findOne').mockImplementation(() => {
      let ret;
      return ret;
    });
    const valid = await storyServices.validateID(mStories[0].id);
    expect(stories.findOne).toHaveBeenCalledTimes(1);
    expect(stories.findOne).toHaveBeenCalledWith({
      where: {
        id: mStories[0].id,
      },
    });
    expect(valid).toEqual(0);
  });
  test('Testing findAllStories', async () => {
    jest.spyOn(stories, 'findAll').mockReturnValue(mStories);
    const storiesList = await storyServices.findAllStories();
    expect(stories.findAll).toHaveBeenCalledTimes(1);
    expect(storiesList).toBe(mStories);
  });
  test('Testing findUserStories', async () => {
    jest.spyOn(stories, 'findAll').mockReturnValue(mStories[0]);
    const storiesList = await storyServices.findUserStories(mStories[0].username);
    expect(stories.findAll).toHaveBeenCalledTimes(1);
    expect(stories.findAll).toHaveBeenCalledWith({
      where: {
        username: mStories[0].username,
      },
    });
    expect(storiesList).toBe(mStories[0]);
  });
  test('Testing findSearchedStories', async () => {
    jest.spyOn(stories, 'findAll').mockReturnValue(mStories[0]);
    const storiesList = await storyServices.findSearchedStories(mStories[0].title);
    expect(stories.findAll).toHaveBeenCalledTimes(1);
    expect(stories.findAll).toHaveBeenCalledWith({
      where: {
        [Op.or]: [
          {
            username: {
              [Op.like]: '%' + mStories[0].title + '%',
            },
          },
          {
            title: {
              [Op.like]: '%' + mStories[0].title + '%',
            },
          },
        ],
      },
    });
    expect(storiesList).toBe(mStories[0]);
  });
  test('Testing findOneStory', async () => {
    jest.spyOn(stories, 'findOne').mockReturnValue(mStories[0]);
    const story = await storyServices.findOneStory(mStories[0].id);
    expect(stories.findOne).toHaveBeenCalledTimes(1);
    expect(stories.findOne).toHaveBeenCalledWith({
      where: {
        id: mStories[0].id,
      },
    });
    expect(story).toBe(mStories[0]);
  });
  test('Testing createStory', async () => {
    jest.spyOn(stories, 'create').mockImplementation((yoyo) => {
      return yoyo;
    });
    const story = await storyServices.createStory(mStories[0]);
    const { username, title, description, rating } = mStories[0];
    expect(stories.create).toHaveBeenCalledTimes(1);
    expect(stories.create).toHaveBeenCalledWith({ username, title, description, rating });
    expect(story).toEqual({ username, title, description, rating });
  });
  test('Testing updateStory', async () => {
    jest.spyOn(stories, 'update').mockReturnValue(1);
    const updated = await storyServices.updateStory(mStories[0].id, mStories[0].title);
    expect(stories.update).toHaveBeenCalledTimes(1);
    expect(stories.update).toHaveBeenCalledWith({ title: mStories[0].title }, { where: { id: mStories[0].id } });
    expect(updated).toBe(1);
  });
  test('Testing removeStory', async () => {
    jest.spyOn(stories, 'destroy').mockReturnValue(1);
    const deleted = await storyServices.removeStory(mStories[0].id);
    expect(stories.destroy).toHaveBeenCalledTimes(1);
    expect(stories.destroy).toHaveBeenCalledWith({ where: { id: mStories[0].id } });
    expect(deleted).toBe(1);
  });
});
