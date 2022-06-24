const articleModel = require('../../models/articleModel');
const articles = articleModel.articles;
const articleServices = require('../../services/articleServices');

const mArticles = require('../mockData/mArticles');

describe('Testilng all functions of articleService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  test('Testing validateID for 1', async () => {
    jest.spyOn(articles, 'findOne').mockImplementation(() => {
      return mArticles[0];
    });
    const valid = await articleServices.validateID(mArticles[0].id);
    expect(articles.findOne).toHaveBeenCalledTimes(1);
    expect(articles.findOne).toHaveBeenCalledWith({
      where: {
        id: mArticles[0].id,
      },
    });
    expect(valid).toEqual(1);
  });
  test('Testing validateID for 0', async () => {
    jest.spyOn(articles, 'findOne').mockImplementation(() => {
      let ret;
      return ret;
    });
    const valid = await articleServices.validateID(mArticles[0].id);
    expect(articles.findOne).toHaveBeenCalledTimes(1);
    expect(articles.findOne).toHaveBeenCalledWith({
      where: {
        id: mArticles[0].id,
      },
    });
    expect(valid).toEqual(0);
  });
  test('Testing findAllArticles', async () => {
    jest.spyOn(articles, 'findAll').mockReturnValue(mArticles);
    const articlesList = await articleServices.findAllArticles();
    expect(articles.findAll).toHaveBeenCalledTimes(1);
    expect(articlesList).toBe(mArticles);
  });
  test('Testing findOneArticle', async () => {
    jest.spyOn(articles, 'findOne').mockReturnValue(mArticles[0]);
    const article = await articleServices.findOneArticle(mArticles[0].id);
    expect(articles.findOne).toHaveBeenCalledTimes(1);
    expect(articles.findOne).toHaveBeenCalledWith({
      where: {
        id: mArticles[0].id,
      },
    });
    expect(article).toBe(mArticles[0]);
  });
  test('Testing createArticle', async () => {
    jest.spyOn(articles, 'create').mockImplementation((yoyo) => {
      return yoyo;
    });
    const article = await articleServices.createArticle(mArticles[0]);
    const { username, title, description, rating } = mArticles[0];
    expect(articles.create).toHaveBeenCalledTimes(1);
    expect(articles.create).toHaveBeenCalledWith({ username, title, description, rating });
    expect(article).toEqual({ username, title, description, rating });
  });
  test('Testing updateArticle', async () => {
    jest.spyOn(articles, 'update').mockReturnValue(1);
    const updated = await articleServices.updateArticle(mArticles[0].id, mArticles[0].title);
    expect(articles.update).toHaveBeenCalledTimes(1);
    expect(articles.update).toHaveBeenCalledWith({ title: mArticles[0].title }, { where: { id: mArticles[0].id } });
    expect(updated).toBe(1);
  });
  test('Testing removeArticle', async () => {
    jest.spyOn(articles, 'destroy').mockReturnValue(1);
    const deleted = await articleServices.removeArticle(mArticles[0].id);
    expect(articles.destroy).toHaveBeenCalledTimes(1);
    expect(articles.destroy).toHaveBeenCalledWith({ where: { id: mArticles[0].id } });
    expect(deleted).toBe(1);
  });
});
