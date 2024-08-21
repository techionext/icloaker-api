import { Request, Response } from 'express';

import { DomainCreateUseCase } from './DomainCreate.UseCase';

export class DomainCreateController {
  constructor(private DomainCreateUseCase: DomainCreateUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { token, url } = request.body;

    const result = await this.DomainCreateUseCase.execute({ token, url });

    return response.status(200).json(result);
  }
}
