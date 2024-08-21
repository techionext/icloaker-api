import { Request, Response } from 'express';

import { CampaignAllowConfigUseCase } from './CampaignAllowConfig.UseCase';

export class CampaignAllowConfigController {
  constructor(private CampaignAllowConfigUseCase: CampaignAllowConfigUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { token, allowIps, allowIsps, allowQueries, allowRefererOrigins } = request.body;
    const { id } = request.params;

    const result = await this.CampaignAllowConfigUseCase.execute({ id, token, allowIps, allowIsps, allowQueries, allowRefererOrigins });

    return response.status(200).json(result);
  }
}
