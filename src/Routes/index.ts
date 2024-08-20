import { Router } from 'express';

import { verifyToken } from '@shared/middlewares/verifyToken';

import { routerAuthentication } from './Authentication/RouterAuthentication';
import { routerCampaign } from './Campaign/RouterCampaign';
import { routerCampaignLog } from './CampaignLog/RouterCampaignLog';
import { routerCollaborator } from './Collaborators/RouterCollaborators';
import { routerDomains } from './Domains/RouterDomains';
import { routerUsers } from './Users/RouterUsers';

const routerIndex = Router();

routerIndex.use('/auth', routerAuthentication);
routerIndex.use('/users', routerUsers);
routerIndex.use('/campaignLogs', routerCampaignLog);

routerIndex.use(verifyToken);

routerIndex.use('/collaborators', routerCollaborator);
routerIndex.use('/domains', routerDomains);
routerIndex.use('/campaigns', routerCampaign);

export { routerIndex };
