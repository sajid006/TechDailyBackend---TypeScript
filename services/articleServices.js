const articleModel = require('../models/articleModel');
const articles = articleModel.articles;

exports.validateID = async (value) => {
    const validarticle = await articles.findOne({
        where: {
            id: value,
        },
    });
    if (validarticle) return 1;
    else return 0;
};

exports.findAllArticles = async () => {
    const articlesList = await articles.findAll();
    return articlesList;
};

exports.findOneArticle = async (id) => {
    const article = await articles.findOne({
        where: {
            id,
        },
    });
    return article;
};

exports.createArticle = async (articleData) => {
    const { username, title, description, rating } = articleData;
    const newArticle = await articles.create({ username, title, description, rating });
    return newArticle;
};

exports.updateArticle = async (id, title) => {
    const myArticle = await articles.update(
        {
            title,
        },
        {
            where: {
                id,
            },
        }
    );
    return myArticle;
};

exports.removeArticle = async (id) => {
    const deleted = articles.destroy({
        where: {
            id,
        },
    });
    return deleted;
};
