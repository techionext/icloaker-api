import { Router } from 'express';

import { verifyToken } from '@shared/middlewares/verifyToken';

import { routerAuth } from './Auth/RouterAuth';
import { routerCampaign } from './Campaign/RouterCampaign';
import { routerCampaignLog } from './CampaignLog/RouterCampaignLog';
import { routerCollaborator } from './Collaborator/RouterCollaborator';
import { routerDashboard } from './Dashboard/RouterDashboard';
import { routerDomain } from './Domain/RouterDomain';
import { routerUser } from './User/RouterUser';

const routerIndex = Router();

routerIndex.use('/auth', routerAuth);
routerIndex.use('/users', routerUser);
routerIndex.use('/campaignLogs', routerCampaignLog);

routerIndex.use(verifyToken);

routerIndex.use('/collaborators', routerCollaborator);
routerIndex.use('/domains', routerDomain);
routerIndex.use('/campaigns', routerCampaign);
routerIndex.use('/dashboard', routerDashboard);

export { routerIndex };
