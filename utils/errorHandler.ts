import { NextFunction, Request, Response } from 'express';
const sendErrorDev = (err: any, res: Response) => {
  res.status(err.statusCode).json({
    status: err.status,
    //error: err,
    message: err.message,
    //stack: err.stack,
  });
};
/*
const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    res.status(500).json({
      status: 'error',
      message: 'Something went wrong',
    });
  }
};
*/
const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  if (!res.headersSent) {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
    console.log(`hello ${err.statusCode} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    sendErrorDev(err, res);
    /*
    if (process.env.NODE_ENV === 'development') {
      sendErrorDev(err, res);
    } else if (process.env.NODE_ENV === 'production') {
      sendErrorProd(err, res);
    }
    */
  }
};
export default errorHandler;
