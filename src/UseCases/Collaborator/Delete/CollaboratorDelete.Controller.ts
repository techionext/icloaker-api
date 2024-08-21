import { Request, Response } from 'express';

import { CollaboratorDeleteUseCase } from './CollaboratorDelete.UseCase';

export class CollaboratorDeleteController {
  constructor(private CollaboratorDeleteUseCase: CollaboratorDeleteUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { token } = request.body;
    const { id } = request.params;

    const result = await this.CollaboratorDeleteUseCase.execute({ id, token });

    return response.status(204).json(result);
  }
}
