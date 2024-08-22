import { Request, Response } from 'express';

import { DashboardMetricsUseCase } from './DashboardMetrics.UseCase';

export class DashboardMetricsController {
  constructor(private DashboardMetricsUseCase: DashboardMetricsUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { token } = request.body;
    const { endDate, startDate } = request.query;

    const result = await this.DashboardMetricsUseCase.execute({ token, endDate, startDate });

    return response.status(200).json(result);
  }
}
