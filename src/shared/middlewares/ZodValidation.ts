import { Request, Response, NextFunction } from 'express';

import { z } from 'zod';

import { AppError } from '../Util/AppError/AppError';

interface IVerifySchemaZod {
  schema: z.ZodObject<any> | z.ZodEffects<any>;
}

export const ZODVerifyDataMiddleware = ({ schema }: IVerifySchemaZod) => {
  const ZodMiddleware = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const data = request.body;
      const dataQuery = request.query;
      const dataFile = request.file;

      const resultParse = schema.parse({ ...data, ...dataQuery, ...dataFile });

      const returnedTarget = Object.assign(data, resultParse);
      request.body = returnedTarget;

      return next();
    } catch (error: any) {
      const { message: messageError } = JSON.parse(error.message)[0];

      throw new AppError(messageError, 422);
    }
  };

  return ZodMiddleware;
};
