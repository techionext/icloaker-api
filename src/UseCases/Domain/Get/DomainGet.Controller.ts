import { Request, Response } from 'express';

import { DomainGetUseCase } from './DomainGet.UseCase';

export class DomainGetController {
  constructor(private DomainGetUseCase: DomainGetUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { token } = request.body;
    const { page, pageSize, filter } = request.query;

    const result = await this.DomainGetUseCase.execute({ token, page, pageSize, filter });

    return response.status(200).json(result);
  }
}
