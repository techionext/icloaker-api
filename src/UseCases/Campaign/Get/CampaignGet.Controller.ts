import { Request, Response } from 'express';

import { CampaignGetUseCase } from './CampaignGet.UseCase';

export class CampaignGetController {
  constructor(private CampaignGetUseCase: CampaignGetUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { token } = request.body;
    const { page, pageSize, filter } = request.query;

    const result = await this.CampaignGetUseCase.execute({ token, page, pageSize, filter });

    return response.status(200).json(result);
  }
}
