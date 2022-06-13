const articleModel = require('../models/articleModel');
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

  exports.findOneArticle = async (id) => {
      let article = await articles.findAll({
        where: {
          id
        },
      });
      return article;
  };

  exports.createArticle = async (articleData) => {
    console.log(articleData.username);
      let newarticle = await articles.create({
        username: `${articleData.username}`,
        title: `${articleData.title}`,
        description: `${articleData.description}`,
        rating: `${articleData.rating}`,
      });
      return newarticle;
  };

  exports.createArticle2 = async (articleData) => {
    const {username, title,description,rating} = articleData;
    const newArticle = await articles.create({username, title,description,rating});
    return newArticle;
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
  