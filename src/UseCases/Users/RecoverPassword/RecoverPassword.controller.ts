import { Request, Response } from 'express';

import { RecoverPasswordUseCase } from './RecoverPassword.useCase';

export class RecoverPasswordController {
  constructor(private RecoverPasswordUseCase: RecoverPasswordUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { password, verifyPassword } = request.body;
    const { id } = request.params;

    const result = await this.RecoverPasswordUseCase.execute({ id, password, verifyPassword });

    return response.status(201).json(result);
  }
}
