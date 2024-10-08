import { Request, Response } from 'express';

import { CampaignUpdateUseCase } from './CampaignUpdate.UseCase';

export class CampaignUpdateController {
  constructor(private CampaignUpdateUseCase: CampaignUpdateUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const {
      token,
      countries,
      devices,
      domain,
      languages,
      manualReview,
      name,
      offerPage,
      origin,
      safePage,
      address,
      companyName,
      disclaimer,
      googleSources,
      pageType,
      safePageMethod,
      supportEmail,
      supportPhone,
      vat,
    } = request.body;
    const { id } = request.params;

    const result = await this.CampaignUpdateUseCase.execute({
      token,
      id,
      countries,
      devices,
      domain,
      languages,
      manualReview,
      name,
      offerPage,
      origin,
      safePage,
      address,
      companyName,
      disclaimer,
      googleSources,
      pageType,
      safePageMethod,
      supportEmail,
      supportPhone,
      vat,
    });

    return response.status(200).json(result);
  }
}
