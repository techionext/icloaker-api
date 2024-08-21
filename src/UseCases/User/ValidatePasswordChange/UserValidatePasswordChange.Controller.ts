import { Request, Response } from 'express';

import { UserValidateForgotPasswordUseCase } from './UserValidatePasswordChange.UseCase';

export class UserValidateForgotPasswordController {
  constructor(private UserValidateForgotPasswordUseCase: UserValidateForgotPasswordUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const result = await this.UserValidateForgotPasswordUseCase.execute({ id });

    return response.status(200).json(result);
  }
}
