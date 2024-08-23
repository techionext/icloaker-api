import { Request, Response } from 'express';

import { CollaboratorSendInviteUseCase } from './CollaboratorSendInvite.UseCase';

export class CollaboratorSendInviteController {
  constructor(private CollaboratorSendInviteUseCase: CollaboratorSendInviteUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { token, email } = request.body;

    const result = await this.CollaboratorSendInviteUseCase.execute({ token, email });

    return response.status(200).json(result);
  }
}
