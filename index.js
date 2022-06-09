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
const winston = require('./config/winston');
const articleRouter = require('./routers/articleRouters');
const userRouter = require('./routers/userRouters');
const database = require('./models/dbconnect');
const logger = require('./config/winston');
const helmet = require('helmet');
const AppError = require('./utils/AppError')
const globalErrorHandler = require('./utils/errorHandler');

const app = express();

app.use(helmet());


//Middlewares
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('combined', {stream: winston.stream}));
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

app.all('*', (req, res, next) => {
  

  // const err = new Error(`Cant find ${req.originalUrl} on this server`);
  // err.status = 'fail';
  // err.statusCode = 404;
  next(new AppError(`Cannot find ${req.originalUrl} on this server`));
});

app.use(globalErrorHandler);

/*
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

// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  //console.log('Helllldks');
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  winston.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);

  res.status(err.status || 500);
  res.send('error');
});
*/
module.exports = app;
