import { Request, Response } from 'express';

import { DashboardCampaignMetricUseCase } from './DashboardCampaignMetric.UseCase';

export class DashboardCampaignMetricController {
  constructor(private DashboardCampaignMetricUseCase: DashboardCampaignMetricUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { token } = request.body;
    const { endDate, startDate } = request.query;
    const { campaignId } = request.params;

    const result = await this.DashboardCampaignMetricUseCase.execute({ token, campaignId, endDate, startDate });

    return response.status(200).json(result);
  }
}
