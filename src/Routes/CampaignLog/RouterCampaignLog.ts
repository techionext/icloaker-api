import { Router } from 'express';

import { CampaignLogCreateControllerIndex } from 'UseCases/CampaignLog/Create';
import { CampaignLogGetControllerIndex } from 'UseCases/CampaignLog/Get';

import { verifyToken } from '@shared/middlewares/verifyToken';

export const routerCampaignLog = Router();

routerCampaignLog.post('/', (req, res) => CampaignLogCreateControllerIndex.handle(req, res));
routerCampaignLog.get('/:campaignId', verifyToken, (req, res) => CampaignLogGetControllerIndex.handle(req, res));
