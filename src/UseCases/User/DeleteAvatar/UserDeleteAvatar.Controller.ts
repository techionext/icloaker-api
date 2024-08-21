import { Request, Response } from 'express';

import { UserDeleteAvatarUseCase } from './UserDeleteAvatar.UseCase';

export class UserDeleteAvatarController {
  constructor(private UserDeleteAvatarUseCase: UserDeleteAvatarUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { token } = request.body;

    const result = await this.UserDeleteAvatarUseCase.execute({ token });

    return response.status(200).json(result);
  }
}
