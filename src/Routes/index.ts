import { Router } from 'express';

import { verifyToken } from '@shared/middlewares/verifyToken';

import { routerAuthentication } from './Authentication/RouterAuthentication';
import { routerCollaborator } from './Collaborators/RouterCollaborators';
import { routerDomains } from './Domains/RouterDomains';
import { routerUsers } from './Users/RouterUsers';

const routerIndex = Router();

routerIndex.use('/auth', routerAuthentication);
routerIndex.use('/users', routerUsers);

routerIndex.use(verifyToken);

routerIndex.use('/collaborators', routerCollaborator);
routerIndex.use('/domains', routerDomains);

export { routerIndex };
