import { Request, Response } from 'express';

import { AuthSessionUseCase } from './AuthSession.UseCase';

export class AuthSessionController {
  constructor(private AuthSessionUseCase: AuthSessionUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { token } = request.body;

    const result = await this.AuthSessionUseCase.execute({ token });

    return response.status(200).json(result);
  }
}
