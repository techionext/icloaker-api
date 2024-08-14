import { Request, Response } from 'express';

import { DeleteCollaboratorUseCase } from './DeleteCollaborator.UseCase';

export class DeleteCollaboratorController {
  constructor(private DeleteCollaboratorUseCase: DeleteCollaboratorUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { token } = request.body;
    const { id } = request.params;

    const result = await this.DeleteCollaboratorUseCase.execute({ id, token });

    return response.status(204).json(result);
  }
}
