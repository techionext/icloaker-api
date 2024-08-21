import { Request, Response } from 'express';

import { UserUpdateAvatarUseCase } from './UserUpdateAvatar.UseCase';

export class UserUpdateAvatarController {
  constructor(private UserUpdateAvatarUseCase: UserUpdateAvatarUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { token } = request.body;
    const avatar: any = request.file;

    const result = await this.UserUpdateAvatarUseCase.execute({ token, avatar });

    return response.status(200).json(result);
  }
}
