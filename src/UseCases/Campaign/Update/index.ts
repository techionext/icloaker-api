import { container } from 'tsyringe';

import { CampaignUpdateController } from './CampaignUpdate.Controller';
import { CampaignUpdateUseCase } from './CampaignUpdate.UseCase';

export const CampaignUpdateControllerIndex = new CampaignUpdateController(container.resolve(CampaignUpdateUseCase));
