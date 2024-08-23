import { Request, Response } from 'express';

import { DashboardCampaignMetricCountryUseCase } from './DashboardCampaignMetricCountry.UseCase';

export class DashboardCampaignMetricCountryController {
  constructor(private DashboardCampaignMetricCountryUseCase: DashboardCampaignMetricCountryUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { token } = request.body;
    const { countryCode, endDate, startDate } = request.query;
    const { campaignId } = request.params;

    const result = await this.DashboardCampaignMetricCountryUseCase.execute({ token, campaignId, countryCode, endDate, startDate });

    return response.status(200).json(result);
  }
}
