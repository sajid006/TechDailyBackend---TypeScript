const articleModel = require('../models/articleModel');
const articles = articleModel.articles;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

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

exports.findUserArticles = async (id) => {
  const articleList = await articles.findAll({
    where: {
      username: id,
    },
  });
  return articleList;
};

exports.findSearchedArticles = async (id) => {
  const articleList = await articles.findAll({
    where: {
      [Op.or]: [
        {
          username: {
            [Op.like]: '%' + id + '%',
          },
        },
        {
          title: {
            [Op.like]: '%' + id + '%',
          },
        },
      ],
    },
  });
  return articleList;
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

exports.updateArticle = async (id, title, description) => {
  const myArticle = await articles.update(
    {
      title,
      description,
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

// $or: [
//   {
//     username: {
//       [Op.like]: '%' + id + '%',
//     },
//   },
//   {
//     title: {
//       [Op.like]: '%' + id + '%',
//     },
//   },
// ],
