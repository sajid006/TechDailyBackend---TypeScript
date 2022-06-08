const express = require('express');
const Sequelize = require('sequelize');
const articleModel = require('../models/articleModel');

const articles = articleModel.article;
const sequelize = articleModel.sequelize;
//Check if the there is any article with this ID
exports.checkID = (req, res, next) => {
  const val = req.params.id;
  console.log(`Article id ${val} `);
  sequelize
    .sync()
    .then((result) => {
      console.log(result);
      return articles.findAll({
        where: {
          id: `${val}`,
        },
      });
    })
    .then((validArticles) => {
      const noOfArticles = validArticles.length;
      if (noOfArticles<1) {
        return res.status(404).json({
          status: 'fail',
          message: 'Invalidd Id',
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });

  next();
};

//Check if request body contains the mandatory fields
exports.checkBody = (req, res, next) => {
  console.log(req.body);
  if (!req.body.title) {
    return res.status(400).json({
      status: 'fail',
      message: 'title missing',
    });
  }
  next();
};

//Read all articles
exports.getAllArticles = (req, res) => {
  //console.log(articles);
  sequelize
    .sync()
    .then((result) => {
      console.log(result);
      return articles.findAll();
    })
    .then((allArticles) => {
      console.log('All the articles', JSON.stringify(allArticles));
      res.status(200).json({
        status: 'success',
        requestedAt: req.requestTime,
        data: {
          article: JSON.stringify(allArticles),
        },
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

//Create an article
exports.postArticle = (req, res) => {
  const userId = req.body.userId;
  const title = req.body.title;
  const description = req.body.description;
  const rating = req.body.rating;
  sequelize
    .sync()
    .then((result) => {
      console.log(result);
      return articles.create({
        userId: `${userId}`,
        title: `${title}`,
        description: `${description}`,
        rating: `${rating}`,
      });
    })
    .then((article) => {
      console.log('First article created:', article);
      res.status(200).json({
        status: 'success',
        requestedAt: req.requestTime,
        data: {
          article: JSON.stringify(article),
        },
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

//Read an article
exports.getOneArticle = (req, res) => {
  const id = req.params.id * 1;
  sequelize
    .sync()
    .then((result) => {
      console.log(result);
      return articles.findAll({
        where: {
          id: `${id}`,
        },
      });
    })
    .then((article) => {
      console.log('Desired article', JSON.stringify(article));
      res.status(200).json({
        status: 'success',
        requestedAt: req.requestTime,
        data: {
          article: JSON.stringify(article),
        },
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

//Update an article
exports.patchArticle = (req, res) => {
  const title = req.body.title;
  const id = req.params.id;

  sequelize
    .sync()
    .then((result) => {
      console.log(result);
      return articles.update(
        { title: `${title}` },
        {
          where: {
            id: `${id}`,
          },
        }
      );
    })
    .then((article) => {
      console.log('Article updated', article);
      res.status(200).json({
        status: 'success',
        requestedAt: req.requestTime,
        data: {
          article: JSON.stringify(article),
        },
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

//Delete an article
exports.deleteArticle = (req, res) => {
  const id = req.params.id;
  sequelize
    .sync()
    .then((result) => {
      console.log(result);
      return articles.destroy({
        where: {
          id: `${id}`,
        },
      });
    })
    .then((article) => {
      console.log('Article deleted', article);
      res.status(200).json({
        status: 'success',
        requestedAt: req.requestTime,
        data: {
          article: JSON.stringify(article),
        },
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
