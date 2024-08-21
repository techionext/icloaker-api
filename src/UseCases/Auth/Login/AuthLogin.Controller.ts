import { Request, Response } from 'express';

import { AuthLoginUseCase } from './AuthLogin.UseCase';

export class AuthLoginController {
  constructor(private AuthLoginUseCase: AuthLoginUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const result = await this.AuthLoginUseCase.execute({ email, password });

    return response.status(200).json(result);
  }
}
