import { Request, Response } from 'express';

import { UserUpdateUseCase } from './UserUpdate.UseCase';

export class UserUpdateController {
  constructor(private UserUpdateUseCase: UserUpdateUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { token, name, phone, role } = request.body;
    const { id } = request.params;

    const result = await this.UserUpdateUseCase.execute({ token, id, name, phone, role });

    return response.status(200).json(result);
  }
}
