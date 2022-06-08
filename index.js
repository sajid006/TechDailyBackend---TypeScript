/*
const fs = require('fs');

const express = require('express');

const app = express();

app.use(morgan('dev'));
 
app.use(express.json());

app.use((req, res, next) => {
    console.log('Hello  from middleware');
    next();
});

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
})

//const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours-simple.json`));
// const server = http.createServer((req, res) => {
//   console.log(req.url);

//   const pathName = req.url;
//   //overview pa
//   if (pathName === '/overview' || pathName === '/') {
//     res.end('This is the overvieW');
//   } else if (pathName === '/product') {
//     res.end('This is proxduct');
//   } else {
//     res.end('Page not found');
//   }
//   //res.end('Hello from server');
// });

// server.listen(8000, '127.0.0.1', () => {
//   console.log('Listening to port 8000');
// });
*/
const express = require('express');
const morgan = require('morgan');
const articleRouter = require('./routers/articleRouters');
const userRouter = require('./routers/userRouters');
const database = require('./models/dbconnect');
const app = express();

//Middlewares
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
// === use winston for logging
// === use helmet for security

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  console.log('Hello from middleware');
  next();
});
//Routes
app.use('/api/v1/articles', articleRouter);
app.use('/api/v1/users', userRouter);

app.use((err, req, res, next) => {
  console.log(err);
  if(res.headersSend) {
    return next(err);
  }
  else if (err) {
    console.log(err);
    res.status(404).send("Not found");
  } 
  else {
    res.status(500).send('There was an error on server side');
  }
});

module.exports = app;
