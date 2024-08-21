import { Request, Response } from 'express';

import { UserConfirmPasswordChangeUseCase } from './UserConfirmPasswordChange.UseCase';

export class UserConfirmPasswordChangeController {
  constructor(private UserConfirmPasswordChangeUseCase: UserConfirmPasswordChangeUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { password, verifyPassword } = request.body;
    const { id } = request.params;

    const result = await this.UserConfirmPasswordChangeUseCase.execute({ id, password, verifyPassword });

    return response.status(201).json(result);
  }
}
