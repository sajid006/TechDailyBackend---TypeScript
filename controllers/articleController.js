const services = require('../services/articleServices');

//Read all articles
exports.getAllArticles = async(req, res) => {
  try{
    const allArticles = await services.findAllArticles();
    res.status(200).json({
      status: 'success',
      requestedAt: req.requestTime,
      data: {
        articles: allArticles,
      },
    });
  }
  catch {
    res.status(404).json({
      error: 'Article List not found',
    });
  }
};

//Read an article
exports.getOneArticle = async (req, res) => {
  try {
    const id = req.params.id * 1;
    const myArticle = await services.findOneArticle(id);
    res.status(200).json({
      status: 'success',
      requestedAt: req.requestTime,
      data: {
        article: JSON.stringify(myArticle),
      },
    });
  } catch {
    res.status(404).json({
      error: 'Article not found',
    });
  }
};

//Create a article
exports.postArticle = async (req, res) => {
  try {
    let articleData = {
      userId: req.body.userId,
      title: req.body.title,
      description: req.body.description,
      rating: req.body.rating,
    };
    
    const newArticle = await services.createArticle(articleData);
    console.log('First Article created:', newArticle);
    console.log(JSON.stringify(newArticle));
    res.status(201).json({
      status: 'success',
      requestedAt: req.requestTime,
      data: {
        Article: JSON.stringify(newArticle),
      },
    });
  } catch {
    res.status(400).json({
      error: 'Article creation failed',
    });
  }
};



//Update a article
exports.patchArticle = async (req, res) => {
  try {
    const title = req.body.title;
    const id = req.params.id;
    const myarticle = await services.updateArticle(id, title);
    console.log('article updated', myarticle);
    res.status(200).json({
      status: 'success',
      requestedAt: req.requestTime,
      data: {
        article: JSON.stringify(myarticle),
      },
    });
  } catch {
    res.status(401).json({
      error: 'article update failed',
    });
  }
};

//Delete a article
exports.deleteArticle = async(req, res) => {
  try{
    const id = req.params.id;
    const deleteResult = await services.removeArticle(id);
    console.log('article deleted', deleteResult);
    res.status(204).json({
      status: 'success',
      requestedAt: req.requestTime,
    });
  }
  catch {
    res.status(401).json({
      error: 'article deletion failed',
    });
  }
  
};
