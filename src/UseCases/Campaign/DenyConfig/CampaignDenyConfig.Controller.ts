import { Request, Response } from 'express';

import { CampaignDenyConfigUseCase } from './CampaignDenyConfig.UseCase';

export class CampaignDenyConfigController {
  constructor(private CampaignDenyConfigUseCase: CampaignDenyConfigUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { token, antiSpy, denyCountries, denyIps, denyIsps, denyLanguages, denyQueries, denyRefererOrigins } = request.body;
    const { id } = request.params;

    const result = await this.CampaignDenyConfigUseCase.execute({
      id,
      token,
      antiSpy,
      denyCountries,
      denyIps,
      denyIsps,
      denyLanguages,
      denyQueries,
      denyRefererOrigins,
    });

    return response.status(200).json(result);
  }
}
