import { container } from 'tsyringe';

import { AuthLoginController } from './AuthLogin.Controller';
import { AuthLoginUseCase } from './AuthLogin.UseCase';

export const AuthLoginControllerIndex = new AuthLoginController(container.resolve(AuthLoginUseCase));
