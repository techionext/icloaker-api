import { Request, Response } from 'express';

import { SendEmailRecoverPasswordUseCase } from './SendEmailRecoverPassword.useCase';

export class SendEmailRecoverPasswordController {
  constructor(private SendEmailRecoverPasswordUseCase: SendEmailRecoverPasswordUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;

    const result = await this.SendEmailRecoverPasswordUseCase.execute({ email });

    return response.status(200).json(result);
  }
}
