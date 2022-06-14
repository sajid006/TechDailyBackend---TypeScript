const express = require('express');
const articleRouter = require('./routers/articleRouters');
const userRouter = require('./routers/userRouters');
const helmet = require('helmet');
const AppError = require('./utils/AppError');
const globalErrorHandler = require('./utils/errorHandler');
const compression = require('compression');
const dbConnect = require('./models/dbconnect');

const app = express();

app.use(helmet());

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
