import { Request, Response } from 'express';

import { CollaboratorAcceptInviteUseCase } from './CollaboratorAcceptInvite.UseCase';

export class CollaboratorAcceptInviteController {
  constructor(private CollaboratorAcceptInviteUseCase: CollaboratorAcceptInviteUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { token } = request.body;
    const { inviteId } = request.params;

    const result = await this.CollaboratorAcceptInviteUseCase.execute({ token, inviteId });

    return response.status(200).json(result);
  }
}
