import { Request, Response } from 'express';

import { UserAddLocalCredentialsUseCase } from './UserAddLocalCredentials.UseCase';

export class UserAddLocalCredentialsController {
  constructor(private UserAddLocalCredentialsUseCase: UserAddLocalCredentialsUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { token, email, password } = request.body;

    const result = await this.UserAddLocalCredentialsUseCase.execute({ token, email, password });

    return response.status(200).json(result);
  }
}
