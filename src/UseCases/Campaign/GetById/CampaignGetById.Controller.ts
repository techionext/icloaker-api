import { Request, Response } from 'express';

import { CampaignGetByIdUseCase } from './CampaignGetById.UseCase';

export class CampaignGetByIdController {
  constructor(private CampaignGetByIdUseCase: CampaignGetByIdUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { token } = request.body;
    const { id } = request.params;

    const result = await this.CampaignGetByIdUseCase.execute({ token, id });

    return response.status(200).json(result);
  }
}
