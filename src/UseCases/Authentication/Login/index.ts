import { container } from 'tsyringe';

import { LoginController } from './Login.controller';
import { LoginUseCase } from './Login.UseCase';

export const LoginControllerIndex = new LoginController(container.resolve(LoginUseCase));
