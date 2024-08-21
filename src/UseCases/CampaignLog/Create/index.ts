import { container } from 'tsyringe';

import { CampaignLogCreateController } from './CampaignLogCreate.Controller';
import { CampaignLogCreateUseCase } from './CampaignLogCreate.UseCase';

export const CampaignLogCreateControllerIndex = new CampaignLogCreateController(container.resolve(CampaignLogCreateUseCase));
