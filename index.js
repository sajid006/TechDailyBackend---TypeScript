const express = require('express');
const articleRouter = require('./routes/articleRoutes');
const userRouter = require('./routes/userRoutes');
const helmet = require('helmet');
const AppError = require('./utils/AppError');
require('./config/winston');
const globalErrorHandler = require('./utils/errorHandler').errorHandler;
const compression = require('compression');
const dbConnect = require('./config/dbconnect');
const cors = require('cors');
const app = express();

app.use(helmet());
app.use(
  cors({
    origin: 'http://localhost:3001',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);
app.use(compression());

app.use(express.json());
dbConnect();

app.use('/api/v1/articles', articleRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Cannot find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
