const articleModel = require('../models/articleModel');
const sequelize = articleModel.sequelize;
const articles = articleModel.article;

exports.validateID = async (value) => {
    try {
      let validarticles = await articles.findAll({
        where: {
          id: `${value}`,
        },
      });
      let noOfArticles = validarticles.length;
      return noOfArticles;
    } catch(err) {
        res.status(404).json({
            error: err,
          });
      }
  };


  exports.findAllArticles = async () => {
    try {
      let articlesList = await articles.findAll();
      return articlesList;
    } catch(err) {
        res.status(404).json({
            error: err,
          });
    }
  };

  exports.findOneArticle = async (articleID) => {
    try {
      let article = await articles.findAll({
        where: {
          id: `${articleID}`,
        },
      });
      return article;
    } catch(err) {
        res.status(404).json({
            error: err,
          });
    }
  };

  exports.createArticle = async (articleData) => {
    try {
      let newarticle = await articles.create({
        userId: `${articleData.userId}`,
        title: `${articleData.title}`,
        description: `${articleData.description}`,
        rating: `${articleData.rating}`,
      });
      return newarticle;
    } catch(err) {
      console.log(err);
      res.status(404).json({
        error: err,
      });
    }
  };


  exports.updateArticle = async (id, articlename) => {
    try {
      let myArticle = await articles.update(
        { title: `${articlename}`},
        {
          where: {
            id: `${id}`,
          },
        }
      );
      return myArticle;
    } catch(err) {
        res.status(404).json({
            error: err,
          });
    }
  };
  
  exports.removeArticle = async (id) => {
    try {
      let deleted = articles.destroy({
        where: {
          id: `${id}`,
        },
      });
      return deleted;
    } catch(err) {
        res.status(404).json({
            error: err,
          });
    }
  };
  