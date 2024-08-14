import { Request, Response } from 'express';

import { CreateCollaboratorUseCase } from './CreateCollaborator.UseCase';

export class CreateCollaboratorController {
  constructor(private CreateCollaboratorUseCase: CreateCollaboratorUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { email, name, token, phone } = request.body;

    const result = await this.CreateCollaboratorUseCase.execute({ email, name, token, phone });

    return response.status(200).json(result);
  }
}
