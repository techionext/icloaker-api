import { Request, Response } from 'express';

import { CampaignLogGetUseCase } from './CampaignLogGet.UseCase';

export class CampaignLogGetController {
  constructor(private CampaignLogGetUseCase: CampaignLogGetUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { page, pageSize } = request.query;
    const { campaignId } = request.params;
    const { token } = request.body;

    const result = await this.CampaignLogGetUseCase.execute({ campaignId, page, pageSize, token });

    return response.status(200).json(result);
  }
}
