import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';
import * as express from 'express';
import { NextFunction, Request, Response } from 'express';
import helmet from 'helmet';
import dbConnect from './config/dbconnect';
import storyRouter from './routes/storyRoutes';
import userRouter from './routes/userRoutes';
import AppError from './utils/appError';
import globalErrorHandler from './utils/errorHandler';
const app: express.Application = express();

app.use(helmet());
app.use(
  cors({
    origin: ['https://techdaily2022.netlify.app', 'http://localhost:3001', 'https://techdaily2023.netlify.app'],
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

app.all('*', (req: Request, res: Response, next: NextFunction) => {
  next(new AppError(`Cannot find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

export default app;
