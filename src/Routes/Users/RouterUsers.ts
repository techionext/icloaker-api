import { Router } from 'express';

import { CreateUserControllerIndex } from 'UseCases/Users/Create';

export const routerUsers = Router();

routerUsers.post('/users/create', (req, res) => CreateUserControllerIndex.handle(req, res));
