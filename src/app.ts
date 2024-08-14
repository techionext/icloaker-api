import 'reflect-metadata';
import './shared/Util/Container/index';
import express, { NextFunction, Request, Response } from 'express';

import 'express-async-errors';
import cors from 'cors';
import http from 'http';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';

import { AppError } from '@shared/Util/AppError/AppError';
import { logger } from '@shared/Util/configLogger';
import { env } from '@shared/Util/Env/Env';

import { routerIndex } from './Routes';
import swaggerDocument from './shared/Swagger/swagger.json';

const app = express();
const serverHttp = http.createServer(app);

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(cors());

app.use(routerIndex);

if (env.NODE_ENV === 'PRODUCTION') {
  process.on('uncaughtException', (error) => logger.error(error));
}

app.use(async (err: Error, request: Request, response: Response, next: NextFunction) => {
  // logger.error(err);

  if (err instanceof AppError) {
    return response.status(err.statusCode).json({ message: err.message });
  }

  response.status(500).json({ message: 'Erro desconhecido!' });
  return next();
});

export { serverHttp };
