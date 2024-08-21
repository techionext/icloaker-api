import { Request, Response, NextFunction } from 'express';

import jwt from 'jsonwebtoken';

import 'dotenv/config';
import { AppError } from '@shared/Util/AppError/AppError';
import { IGenerateToken, generateToken } from '@shared/Util/configToken/generateToken';
import { env } from '@shared/Util/Env/Env';
import { ErrorDictionary } from '@shared/Util/ErrorDictionary';

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  const queryToken = 'Bearer ' + req.query.token;
  const authToken = req.headers.authorization ?? queryToken;
  const SECRET = env.JWT.SECRET;

  if (!authToken) throw new AppError(ErrorDictionary.AUTH.tokenNotSent, 401);

  const [Bearer, token] = authToken.split(' ');
  if (Bearer && Bearer !== 'Bearer') throw new AppError(ErrorDictionary.AUTH.invalidTokenFormat, 401);

  let resultToken = token;

  jwt.verify(resultToken, SECRET, { ignoreExpiration: true }, (err, decoded) => {
    if (err) throw new AppError(ErrorDictionary.AUTH.invalidTokenFormat, 401);

    const decodedToken = decoded as IGenerateToken;
    resultToken = generateToken({ ...decodedToken });
  });

  return jwt.verify(resultToken, SECRET, (err, decoded) => {
    if (err?.message === 'jwt expired') throw new AppError(ErrorDictionary.AUTH.sessionExpired, 401);
    if (err) throw new AppError(ErrorDictionary.AUTH.invalidTokenFormat, 401);

    const decodedToken = decoded as IGenerateToken;

    if (!decodedToken.id) throw new AppError(ErrorDictionary.AUTH.invalidTokenFormat, 401);

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
