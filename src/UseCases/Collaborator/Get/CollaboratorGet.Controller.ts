import { Request, Response } from 'express';

import { CollaboratorGetUseCase } from './CollaboratorGet.UseCase';

export class CollaboratorGetController {
  constructor(private CollaboratorGetUseCase: CollaboratorGetUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { token } = request.body;
    const { page, pageSize, filter } = request.query;

    const result = await this.CollaboratorGetUseCase.execute({ page, pageSize, token, filter });

    return response.status(200).json(result);
  }
}
