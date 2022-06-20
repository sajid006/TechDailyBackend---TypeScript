const articleModel = require('../../models/articleModel');
const articles = articleModel.articles;
const articleServices = require('../../services/articleServices');

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

describe('Testilng all functions of articleService', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    test('Testing validateID', async () => {
        jest.spyOn(articles, 'findOne').mockImplementation(() => {
            return myArticles[0];
        });
        const valid = await articleServices.validateID(myArticles[0].id);
        expect(articles.findOne).toHaveBeenCalledTimes(1);
        expect(articles.findOne).toHaveBeenCalledWith({
            where: {
                id: myArticles[0].id,
            },
        });
        expect(valid).toEqual(1);
    });
    test('Testing findAllArticles', async () => {
        jest.spyOn(articles, 'findAll').mockReturnValue(myArticles);
        const articlesList = await articleServices.findAllArticles();
        expect(articles.findAll).toHaveBeenCalledTimes(1);
        expect(articlesList).toBe(myArticles);
    });
    test('Testing findOneArticle', async () => {
        jest.spyOn(articles, 'findOne').mockReturnValue(myArticles[0]);
        const article = await articleServices.findOneArticle(myArticles[0].id);
        expect(articles.findOne).toHaveBeenCalledTimes(1);
        expect(articles.findOne).toHaveBeenCalledWith({
            where: {
                id: myArticles[0].id,
            },
        });
        expect(article).toBe(myArticles[0]);
    });
    test('Testing createArticle', async () => {
        jest.spyOn(articles, 'create').mockImplementation((yoyo) => {
            return yoyo;
        });
        const article = await articleServices.createArticle(myArticles[0]);
        const { username, title, description, rating } = myArticles[0];
        expect(articles.create).toHaveBeenCalledTimes(1);
        expect(articles.create).toHaveBeenCalledWith({ username, title, description, rating });
        expect(article).toEqual({ username, title, description, rating });
    });
    test('Testing updateArticle', async () => {
        jest.spyOn(articles, 'update').mockReturnValue(1);
        const updated = await articleServices.updateArticle(myArticles[0].id, myArticles[0].title);
        expect(articles.update).toHaveBeenCalledTimes(1);
        expect(articles.update).toHaveBeenCalledWith(
            { title: myArticles[0].title },
            { where: { id: myArticles[0].id } }
        );
        expect(updated).toBe(1);
    });
    test('Testing removeArticle', async () => {
        jest.spyOn(articles, 'destroy').mockReturnValue(1);
        const deleted = await articleServices.removeArticle(myArticles[0].id);
        expect(articles.destroy).toHaveBeenCalledTimes(1);
        expect(articles.destroy).toHaveBeenCalledWith({ where: { id: myArticles[0].id } });
        expect(deleted).toBe(1);
    });
});
