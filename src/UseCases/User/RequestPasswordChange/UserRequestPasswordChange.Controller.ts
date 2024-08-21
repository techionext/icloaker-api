import { Request, Response } from 'express';

import { UserRequestPasswordChangeUseCase } from './UserRequestPasswordChange.UseCase';

export class UserRequestPasswordChangeController {
  constructor(private UserRequestPasswordChangeUseCase: UserRequestPasswordChangeUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;

    const result = await this.UserRequestPasswordChangeUseCase.execute({ email });

    return response.status(200).json(result);
  }
}
