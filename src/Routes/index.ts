import { Router } from 'express';

import { verifyToken } from '@shared/middlewares/verifyToken';

import { routerAuthentication } from './Authentication/RouterAuthentication';
import { routerCollaborator } from './Collaborators/RouterCollaborators';
import { routerUsers } from './Users/RouterUsers';

const routerIndex = Router();

routerIndex.use(routerAuthentication);
routerIndex.use(routerUsers);

routerIndex.use(verifyToken);

routerIndex.use('/collaborators', routerCollaborator);

export { routerIndex };
