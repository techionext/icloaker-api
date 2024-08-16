import { Request, Response } from 'express';

import { DomainUpdateUseCase } from './DomainUpdate.UseCase';

export class DomainUpdateController {
  constructor(private DomainUpdateUseCase: DomainUpdateUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { token, url } = request.body;
    const { id } = request.params;

    const result = await this.DomainUpdateUseCase.execute({ token, id, url });

    return response.status(200).json(result);
  }
}
