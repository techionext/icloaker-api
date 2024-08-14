import { z } from 'zod';

import { AppError } from '../AppError/AppError';

interface IZODVerifyParse<T extends z.ZodTypeAny> {
  schema: T;
  data: unknown;
}

export const ZODVerifyParse = <T extends z.ZodTypeAny>({ schema, data }: IZODVerifyParse<T>): z.infer<T> => {
  try {
    const resultParse = schema.parse(data);
    return resultParse;
  } catch (error: any) {
    const { message: messageError } = JSON.parse(error.message)[0];

    throw new AppError(messageError, 422);
  }
};
