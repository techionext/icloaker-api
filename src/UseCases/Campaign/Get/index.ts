import { container } from 'tsyringe';

import { CampaignGetController } from './CampaignGet.Controller';
import { CampaignGetUseCase } from './CampaignGet.UseCase';

export const CampaignGetControllerIndex = new CampaignGetController(container.resolve(CampaignGetUseCase));
