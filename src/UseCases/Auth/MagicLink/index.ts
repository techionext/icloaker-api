import { container } from 'tsyringe';

import { AuthMagicLinkController } from './AuthMagicLink.Controller';
import { AuthMagicLinkUseCase } from './AuthMagicLink.UseCase';

export const AuthMagicLinkControllerIndex = new AuthMagicLinkController(container.resolve(AuthMagicLinkUseCase));
