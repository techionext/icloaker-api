import { Request, Response } from 'express';

import { CollaboratorUpdateUseCase } from './CollaboratorUpdate.UseCase';

export class CollaboratorUpdateController {
  constructor(private CollaboratorUpdateUseCase: CollaboratorUpdateUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { token, role } = request.body;
    const { id } = request.params;

    const result = await this.CollaboratorUpdateUseCase.execute({ id, token, role });

    return response.status(200).json(result);
  }
}
