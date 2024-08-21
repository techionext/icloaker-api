import { Request, Response } from 'express';

import { CollaboratorCreateUseCase } from './CollaboratorCreate.UseCase';

export class CollaboratorCreateController {
  constructor(private CollaboratorCreateUseCase: CollaboratorCreateUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { email, name, token, phone } = request.body;

    const result = await this.CollaboratorCreateUseCase.execute({ email, name, token, phone });

    return response.status(200).json(result);
  }
}
