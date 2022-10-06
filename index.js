const express = require('express');
const storyRouter = require('./routes/storyRoutes');
const userRouter = require('./routes/userRoutes');
const helmet = require('helmet');
const AppError = require('./utils/appError');
const errorHandler = require('./utils/errorHandler').default;
const compression = require('compression');
const dbConnect = require('./config/dbconnect');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('./config/winston');
const app = express();

app.use(helmet());
app.use(
  cors({
    origin: 'http://localhost:3001',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
  })
);
app.use(compression());

app.use(express.json());
app.use(cookieParser());
dbConnect();

app.use('/api/v1/stories', storyRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Cannot find ${req.originalUrl} on this server`, 404));
});

app.use(errorHandler);

module.exports = app;
