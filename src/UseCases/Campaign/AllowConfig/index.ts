import { container } from 'tsyringe';

import { CampaignAllowConfigController } from './CampaignAllowConfig.Controller';
import { CampaignAllowConfigUseCase } from './CampaignAllowConfig.UseCase';

export const CampaignAllowConfigControllerIndex = new CampaignAllowConfigController(container.resolve(CampaignAllowConfigUseCase));
