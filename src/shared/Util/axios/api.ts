import axios from 'axios';

import { env } from '../Env/Env';

export const api = axios.create({
  baseURL: env.WPP_API_URL,
});
