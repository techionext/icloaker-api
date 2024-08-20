import { Request, Response } from 'express';

import { CampaignLogCreateUseCase } from './CampaignLogCreate.UseCase';

export class CampaignLogCreateController {
  constructor(private CampaignLogCreateUseCase: CampaignLogCreateUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { campaignId, ip, redirectTo, page, referer, userAgent, language, ipInfo, deviceInfo, apiResponse } = request.body;

    const result = await this.CampaignLogCreateUseCase.execute({
      campaignId,
      ip,
      redirectTo,
      page,
      referer,
      userAgent,
      language,
      ipInfo,
      deviceInfo,
      apiResponse,
    });

    return response.status(200).json(result);
  }
}
