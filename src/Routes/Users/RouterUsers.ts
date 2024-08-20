import { Router } from 'express';

import { CreateUserControllerIndex } from 'UseCases/Users/Create';
import { UserCreatePasswordControllerIndex } from 'UseCases/Users/CreatePassword';
import { UsersGetByIdControllerIndex } from 'UseCases/Users/GetById';
import { UsersUpdateControllerIndex } from 'UseCases/Users/Update';

import { verifyToken } from '@shared/middlewares/verifyToken';

export const routerUsers = Router();

routerUsers.post('', (req, res) => CreateUserControllerIndex.handle(req, res));

routerUsers.post('/password', verifyToken, (req, res) => UserCreatePasswordControllerIndex.handle(req, res));

routerUsers.get('/:id', verifyToken, (req, res) => UsersGetByIdControllerIndex.handle(req, res));

routerUsers.put('/:id', verifyToken, (req, res) => UsersUpdateControllerIndex.handle(req, res));
