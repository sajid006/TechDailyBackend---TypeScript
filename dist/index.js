"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const storyRouter = require('./routes/storyRoutes');
const userRouter = require('./routes/userRoutes');
const helmet = require('helmet');
const AppError = require('./utils/appError');
require('./config/winston');
const globalErrorHandler = require('./utils/errorHandler').errorHandler;
const compression = require('compression');
const dbConnect = require('./config/dbconnect');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();
app.use(helmet());
app.use(cors({
    origin: ['https://techdaily2022.netlify.app', 'http://localhost:3001', 'https://techdaily2023.netlify.app'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
}));
app.use(compression());
app.use(express.json());
app.use(cookieParser());
dbConnect();
app.use('/api/v1/stories', storyRouter);
app.use('/api/v1/users', userRouter);
app.all('*', (req, res, next) => {
    next(new AppError(`Cannot find ${req.originalUrl} on this server`, 404));
});
app.use(globalErrorHandler);
exports.default = app;
