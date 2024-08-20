import { Request, Response } from 'express';

import { UsersUpdateUseCase } from './UsersUpdate.UseCase';

export class UsersUpdateController {
  constructor(private UsersUpdateUseCase: UsersUpdateUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { token, email, name, role, phone } = request.body;
    const { id } = request.params;

    const result = await this.UsersUpdateUseCase.execute({ token, id, email, name, role, phone });

    return response.status(200).json(result);
  }
}
