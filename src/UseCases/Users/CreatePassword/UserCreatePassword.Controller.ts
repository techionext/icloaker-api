import { Request, Response } from 'express';

import { UserCreatePasswordUseCase } from './UserCreatePassword.UseCase';

export class UserCreatePasswordController {
  constructor(private UserCreatePasswordUseCase: UserCreatePasswordUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { token, password, confirmPassword } = request.body;

    console.log({ token, password, confirmPassword });

    const result = await this.UserCreatePasswordUseCase.execute({ token, password, confirmPassword });

    return response.status(200).json(result);
  }
}
