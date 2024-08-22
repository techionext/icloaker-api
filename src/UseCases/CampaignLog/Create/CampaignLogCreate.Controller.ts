import { Request, Response } from 'express';

import { CampaignLogCreateUseCase } from './CampaignLogCreate.UseCase';

export class CampaignLogCreateController {
  constructor(private CampaignLogCreateUseCase: CampaignLogCreateUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { campaignId, apiResponse, ipInfo, pageUrl, redirectTo, refererPage, requestInfo } = request.body;

    const result = await this.CampaignLogCreateUseCase.execute({
      campaignId,
      apiResponse,
      ipInfo,
      pageUrl,
      redirectTo,
      refererPage,
      requestInfo,
    });

    return response.status(200).json(result);
  }
}
