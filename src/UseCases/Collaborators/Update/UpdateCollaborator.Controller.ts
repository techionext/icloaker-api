import { Request, Response } from 'express';

import { UpdateCollaboratorUseCase } from './UpdateCollaborator.UseCase';

export class UpdateCollaboratorController {
  constructor(private UpdateCollaboratorUseCase: UpdateCollaboratorUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { token, role } = request.body;
    const { id } = request.params;

    const result = await this.UpdateCollaboratorUseCase.execute({ id, token, role });

    return response.status(200).json(result);
  }
}
