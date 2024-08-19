import { Request, Response } from 'express';

import { UsersGetByIdUseCase } from './UsersGetById.UseCase';

export class UsersGetByIdController {
  constructor(private UsersGetByIdUseCase: UsersGetByIdUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { token } = request.body;
    const { id } = request.params;

    const result = await this.UsersGetByIdUseCase.execute({ token, id });

    return response.status(200).json(result);
  }
}
