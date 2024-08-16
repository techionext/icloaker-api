import { Request, Response } from 'express';

import { DomainGetByIdUseCase } from './DomainGetById.UseCase';

export class DomainGetByIdController {
  constructor(private DomainGetByIdUseCase: DomainGetByIdUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { token } = request.body;
    const { id } = request.params;

    const result = await this.DomainGetByIdUseCase.execute({ token, id });

    return response.status(200).json(result);
  }
}
