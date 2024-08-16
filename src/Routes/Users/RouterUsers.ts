import { Router } from 'express';

import { CreateUserControllerIndex } from 'UseCases/Users/Create';
import { UserCreatePasswordControllerIndex } from 'UseCases/Users/CreatePassword';

import { verifyToken } from '@shared/middlewares/verifyToken';

export const routerUsers = Router();

routerUsers.post('', (req, res) => CreateUserControllerIndex.handle(req, res));

routerUsers.post('/password', verifyToken, (req, res) => UserCreatePasswordControllerIndex.handle(req, res));
