import { Request, Response } from 'express';

import { DomainDeleteUseCase } from './DomainDelete.UseCase';

export class DomainDeleteController {
  constructor(private DomainDeleteUseCase: DomainDeleteUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { token } = request.body;
    const { id } = request.params;

    const result = await this.DomainDeleteUseCase.execute({ token, id });

    return response.status(200).json(result);
  }
}
