const articleModel = require('../models/articleModel');
const sequelize = articleModel.sequelize;
const articles = articleModel.article;

exports.validateID = async (value) => {
      let validarticles = await articles.findAll({
        where: {
          id: `${value}`,
        },
      });
      let noOfArticles = validarticles.length;
      return noOfArticles;
  };


  exports.findAllArticles = async () => {
      let articlesList = await articles.findAll();
      return articlesList;
  };

  exports.findOneArticle = async (articleID) => {
      let article = await articles.findAll({
        where: {
          id: `${articleID}`,
        },
      });
      return article;
  };

  exports.createArticle = async (articleData) => {
      let newarticle = await articles.create({
        userId: `${articleData.userId}`,
        title: `${articleData.title}`,
        description: `${articleData.description}`,
        rating: `${articleData.rating}`,
      });
      return newarticle;
    
  };


  exports.updateArticle = async (id, articlename) => {
      let myArticle = await articles.update(
        { title: `${articlename}`},
        {
          where: {
            id: `${id}`,
          },
        }
      );
      return myArticle;
  };
  
  exports.removeArticle = async (id) => {
      let deleted = articles.destroy({
        where: {
          id: `${id}`,
        },
      });
      return deleted;
  };
  