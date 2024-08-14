import { Request, Response } from 'express';

import { CreateUserUseCase } from './CreateUser.UseCase';

export class CreateUserController {
  constructor(private CreateUserUseCase: CreateUserUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { email, name, password, phone } = request.body;

    const result = await this.CreateUserUseCase.execute({ email, name, password, phone });

    return response.status(201).json(result);
  }
}
