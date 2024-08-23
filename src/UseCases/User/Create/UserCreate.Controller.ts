import { Request, Response } from 'express';

import { UserCreateUseCase } from './UserCreate.UseCase';

export class UserCreateController {
  constructor(private UserCreateUseCase: UserCreateUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { email, name, password, phone, inviteId } = request.body;

    const result = await this.UserCreateUseCase.execute({ email, name, password, phone, inviteId });

    return response.status(201).json(result);
  }
}
