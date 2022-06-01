const fs = require('fs');
const articles = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/articles-sample.json`)
);
//Route Handlers
exports.getAllArticles = (req, res) => {
  console.log(req.requestTime);
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    data: {
      articles: articles,
    },
  });
};

exports.getOneArticle = (req, res) => {
  console.log(req.params);
  const id = req.params.id * 1;
  const article = articles.find((el) => el.id === id);
  if (!article) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid Id',
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      article,
    },
  });
};

exports.postArticle = (req, res) => {
  //console.log(req.body);
  const newId = Number(articles[articles.length - 1].id) + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  articles.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/articles-sample.json`,
    JSON.stringify(articles),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          articles,
        },
      });
    }
  );
  //res.send('Done');
};

exports.patchArticle = (req, res) => {
  if (req.params.id * 1 > articles.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid Id',
    });
  }
  res.status(200).json({
    status: 'success',
    data: {
      article: '<updated trophies>',
    },
  });
};

exports.deleteArticle = (req, res) => {
  if (req.params.id * 1 > articles.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalidd Id',
    });
  }
  res.status(204).json({
    status: 'success',
    data: null,
  });
};
