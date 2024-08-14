import { Request, Response, NextFunction } from 'express';

import jwt from 'jsonwebtoken';

import 'dotenv/config';
import { AppError } from '@shared/Util/AppError/AppError';
import { IGenerateToken, generateToken } from '@shared/Util/configToken/generateToken';
import { env } from '@shared/Util/Env/Env';

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  const authToken = req.headers.authorization;
  const SECRET = env.SECRET_TOKEN;

  if (!authToken) return res.status(401).json({ message: 'Token não enviado, faça seu login novamente' });

  const [Bearer, token] = authToken.split(' ');
  if (Bearer && Bearer !== 'Bearer') res.status(401).json({ message: 'Token com formato invalido !' });

  let resultToken = token;

  jwt.verify(resultToken, SECRET, { ignoreExpiration: true }, (err, decoded) => {
    if (err) throw new AppError('Token com formato invalido !', 401);

    const decodedToken = decoded as IGenerateToken;
    resultToken = generateToken({ ...decodedToken });
  });

  return jwt.verify(resultToken, SECRET, (err, decoded) => {
    if (err?.message === 'jwt expired') throw new AppError('Sessão expirada, faça seu login novamente !', 401);
    if (err) throw new AppError('Token com formato invalido !', 401);

    const decodedToken = decoded as IGenerateToken;

    if (!decodedToken.id) throw new AppError('Token com formato invalido !', 401);
    if (!decodedToken.email) throw new AppError('Token com formato invalido !', 401);

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
