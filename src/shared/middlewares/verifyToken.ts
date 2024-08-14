import { Request, Response, NextFunction } from 'express';

import jwt from 'jsonwebtoken';

import 'dotenv/config';
import { AppError } from '@shared/Util/AppError/AppError';
import { IGenerateToken, generateToken } from '@shared/Util/configToken/generateToken';
import { env } from '@shared/Util/Env/Env';
import { ErrorDictionary } from '@shared/Util/ErrorDictionary';

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  const authToken = req.headers.authorization;
  const SECRET = env.SECRET_TOKEN;

  if (!authToken) throw new AppError(ErrorDictionary.AUTH.tokenNotSent.message, 401, ErrorDictionary.AUTH.tokenNotSent.codeIntern);

  const [Bearer, token] = authToken.split(' ');
  if (Bearer && Bearer !== 'Bearer')
    throw new AppError(ErrorDictionary.AUTH.invalidTokenFormat.message, 401, ErrorDictionary.AUTH.invalidTokenFormat.codeIntern);

  let resultToken = token;

  jwt.verify(resultToken, SECRET, { ignoreExpiration: true }, (err, decoded) => {
    if (err) throw new AppError(ErrorDictionary.AUTH.invalidTokenFormat.message, 401, ErrorDictionary.AUTH.invalidTokenFormat.codeIntern);

    const decodedToken = decoded as IGenerateToken;
    resultToken = generateToken({ ...decodedToken });
  });

  return jwt.verify(resultToken, SECRET, (err, decoded) => {
    if (err?.message === 'jwt expired')
      throw new AppError(ErrorDictionary.AUTH.sessionExpired.message, 401, ErrorDictionary.AUTH.sessionExpired.codeIntern);
    if (err) throw new AppError(ErrorDictionary.AUTH.invalidTokenFormat.message, 401, ErrorDictionary.AUTH.invalidTokenFormat.codeIntern);

    const decodedToken = decoded as IGenerateToken;

    if (!decodedToken.id)
      throw new AppError(ErrorDictionary.AUTH.invalidTokenFormat.message, 401, ErrorDictionary.AUTH.invalidTokenFormat.codeIntern);
    if (!decodedToken.email)
      throw new AppError(ErrorDictionary.AUTH.invalidTokenFormat.message, 401, ErrorDictionary.AUTH.invalidTokenFormat.codeIntern);

    req.body = {
      ...req.body,
      token: {
        id: decodedToken.id,
        email: decodedToken.email,
      },
    };

    return next();
  });
};
