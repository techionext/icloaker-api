import jwt from 'jsonwebtoken';

import 'dotenv/config';
import { env } from '../Env/Env';

export type IGenerateToken = {
  id: string;
  email: string | null;
};

export const generateToken = ({ email, id }: IGenerateToken) =>
  jwt.sign(
    { email, id },
    String(env.JWT.SECRET),
    { expiresIn: 60 * 60 * 24 }, // 24h
  );
