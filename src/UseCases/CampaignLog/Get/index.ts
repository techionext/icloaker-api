import { container } from 'tsyringe';

import { CampaignLogGetController } from './CampaignLogGet.Controller';
import { CampaignLogGetUseCase } from './CampaignLogGet.UseCase';

export const CampaignLogGetControllerIndex = new CampaignLogGetController(container.resolve(CampaignLogGetUseCase));
