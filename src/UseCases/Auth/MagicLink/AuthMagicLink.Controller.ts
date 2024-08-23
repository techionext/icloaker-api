import { Request, Response } from 'express';

import { AuthMagicLinkUseCase } from './AuthMagicLink.UseCase';

export class AuthMagicLinkController {
  constructor(private AuthMagicLinkUseCase: AuthMagicLinkUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const result = await this.AuthMagicLinkUseCase.execute({ id });

    return response.status(200).json(result);
  }
}
