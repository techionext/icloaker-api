import { container } from 'tsyringe';

import { CampaignDeleteController } from './CampaignDelete.Controller';
import { CampaignDeleteUseCase } from './CampaignDelete.UseCase';

export const CampaignDeleteControllerIndex = new CampaignDeleteController(container.resolve(CampaignDeleteUseCase));
