import { Request, Response } from 'express';

import { CampaignCreateUseCase } from './CampaignCreate.UseCase';

export class CampaignCreateController {
  constructor(private CampaignCreateUseCase: CampaignCreateUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { token, devices, domain, name, origin, countries, languages, manualReview, offerPage, safePage } = request.body;

    const result = await this.CampaignCreateUseCase.execute({
      token,
      devices,
      domain,
      name,
      origin,
      countries,
      languages,
      manualReview,
      offerPage,
      safePage,
    });

    return response.status(200).json(result);
  }
}
