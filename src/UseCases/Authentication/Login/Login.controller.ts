import { Request, Response } from 'express';

import { LoginUseCase } from './Login.UseCase';

export class LoginController {
  constructor(private loginUseCase: LoginUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { password, email } = request.body;

    const data = await this.loginUseCase.execute({ password, email });

    return response.status(200).json(data);
  }
}
