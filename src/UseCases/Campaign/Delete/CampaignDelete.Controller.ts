import { Request, Response } from 'express';

import { CampaignDeleteUseCase } from './CampaignDelete.UseCase';

export class CampaignDeleteController {
  constructor(private CampaignDeleteUseCase: CampaignDeleteUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { token } = request.body;
    const { id } = request.params;

    const result = await this.CampaignDeleteUseCase.execute({ token, id });

    return response.status(200).json(result);
  }
}
