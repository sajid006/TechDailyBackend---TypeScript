const services = require('../services/articleServices');
const catchAsync = require('../utils/catchAsync');

//Read all articles
exports.getAllArticles = catchAsync( async(req, res, next) => {

    const allArticles = await services.findAllArticles();
    res.status(200).json({
      status: 'success',
      requestedAt: req.requestTime,
      data: {
        articles: allArticles,
      },
    });
  
});

//Read an article
exports.getOneArticle = catchAsync( async (req, res, next) => {
    const id = req.params.id * 1;
    const myArticle = await services.findOneArticle(id);
    res.status(200).json({
      status: 'success',
      requestedAt: req.requestTime,
      data: {
        article: JSON.stringify(myArticle),
      },
    });
  
});

//Create a article
exports.postArticle =catchAsync ( async (req, res, next) => {
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
  
});



//Update a article
exports.patchArticle = catchAsync( async (req, res, next) => {
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
});

//Delete a article
exports.deleteArticle = catchAsync( async(req, res, next) => {
    const id = req.params.id;
    const deleteResult = await services.removeArticle(id);
    console.log('article deleted', deleteResult);
    res.status(204).json({
      status: 'success',
      requestedAt: req.requestTime,
    });
});
