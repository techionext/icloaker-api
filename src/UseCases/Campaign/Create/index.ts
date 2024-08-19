import { container } from 'tsyringe';

import { CampaignCreateController } from './CampaignCreate.Controller';
import { CampaignCreateUseCase } from './CampaignCreate.UseCase';

export const CampaignCreateControllerIndex = new CampaignCreateController(container.resolve(CampaignCreateUseCase));
