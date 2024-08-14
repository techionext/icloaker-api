import { Request, Response } from 'express';

import { GetCollaboratorsUseCase } from './GetCollaborators.UseCase';

export class GetCollaboratorsController {
  constructor(private GetCollaboratorsUseCase: GetCollaboratorsUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { token } = request.body;
    const { page, pageSize, filter } = request.query;

    const result = await this.GetCollaboratorsUseCase.execute({ page, pageSize, token, filter });

    return response.status(200).json(result);
  }
}
