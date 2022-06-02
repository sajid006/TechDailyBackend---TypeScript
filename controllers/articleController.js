const fs = require('fs');

const articles = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/articles-sample.json`)
);
exports.checkID = (req, res, next, val) => {
  console.log(`Article id ${val}`);
  if (req.params.id * 1 > articles.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalidd Id',
    });
  }
  next();
};

exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.trophies) {
    return res.status(400).json({
      status: 'fail',
      message: 'name/price missing',
    });
  }
  next();
};
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
  const newTour = { id: newId, ...req.body };

  articles.push(newTour);
  fs.writeFile(
    `${__dirname}/../dev-data/data/articles-sample.json`,
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
  res.status(200).json({
    status: 'success',
    data: {
      article: '<updated trophies>',
    },
  });
};

exports.deleteArticle = (req, res) => {
  console.log('Deleting?');
  res.status(200).json({
    status: 'success',
    data: {
      article: '<deleted>',
    },
  });
};
