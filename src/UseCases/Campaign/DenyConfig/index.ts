import { container } from 'tsyringe';

import { CampaignDenyConfigController } from './CampaignDenyConfig.Controller';
import { CampaignDenyConfigUseCase } from './CampaignDenyConfig.UseCase';

export const CampaignDenyConfigControllerIndex = new CampaignDenyConfigController(container.resolve(CampaignDenyConfigUseCase));
