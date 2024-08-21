import { Router } from 'express';

import { CampaignAllowConfigControllerIndex } from 'UseCases/Campaign/AllowConfig';
import { CampaignCreateControllerIndex } from 'UseCases/Campaign/Create';
import { CampaignDeleteControllerIndex } from 'UseCases/Campaign/Delete';
import { CampaignDenyConfigControllerIndex } from 'UseCases/Campaign/DenyConfig';
import { CampaignGetControllerIndex } from 'UseCases/Campaign/Get';
import { CampaignGetByIdControllerIndex } from 'UseCases/Campaign/GetById';
import { CampaignUpdateControllerIndex } from 'UseCases/Campaign/Update';

export const routerCampaign = Router();

routerCampaign.post('', (req, res) => CampaignCreateControllerIndex.handle(req, res));
routerCampaign.get('', (req, res) => CampaignGetControllerIndex.handle(req, res));
routerCampaign.put('/:id', (req, res) => CampaignUpdateControllerIndex.handle(req, res));
routerCampaign.get('/:id', (req, res) => CampaignGetByIdControllerIndex.handle(req, res));
routerCampaign.delete('/:id', (req, res) => CampaignDeleteControllerIndex.handle(req, res));

routerCampaign.put('/allow/:id', (req, res) => CampaignAllowConfigControllerIndex.handle(req, res));
routerCampaign.put('/deny/:id', (req, res) => CampaignDenyConfigControllerIndex.handle(req, res));
