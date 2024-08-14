import { Request, Response } from 'express';

import { SessionUseCase } from './Session.useCase';

export class SessionUserController {
  constructor(private SessionUseCase: SessionUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const {
      token: { id },
    } = request.body;

    const result = await this.SessionUseCase.execute({ idUser: id });

    return response.status(200).json(result);
  }
}
