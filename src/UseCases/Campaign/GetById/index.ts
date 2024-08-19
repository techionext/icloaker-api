import { container } from 'tsyringe';

import { CampaignGetByIdController } from './CampaignGetById.Controller';
import { CampaignGetByIdUseCase } from './CampaignGetById.UseCase';

export const CampaignGetByIdControllerIndex = new CampaignGetByIdController(container.resolve(CampaignGetByIdUseCase));
