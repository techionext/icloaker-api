import { Request, Response } from 'express';

import { ValidateForgotPasswordUseCase } from './ValidateRecoverPassword.useCase';

export class ValidateForgotPasswordController {
  constructor(private ValidateForgotPasswordUseCase: ValidateForgotPasswordUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const result = await this.ValidateForgotPasswordUseCase.execute({ id });

    return response.status(200).json(result);
  }
}
