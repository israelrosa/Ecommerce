/* eslint-disable no-console */
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import router from '@shared/routes';
import AppError from '@shared/Error/AppError';

(async () => {
  await createConnection();
})();

const app = express();

app.use(express.json());

app.use(router);

app.use(cors());

app.use(
  (error: Error, request: Request, response: Response, _: NextFunction) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        status: 'error',
        message: error.message,
      });
    }

    console.log(error);

    return response.status(500).json({
      status: 'error',
      message: 'Internal Server Error',
    });
  },
);

app.listen('3333', () => {
  console.log('Listening at port 3333!');
});
