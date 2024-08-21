import { container } from 'tsyringe';

import { AuthSessionController } from './AuthSession.Controller';
import { AuthSessionUseCase } from './AuthSession.UseCase';

export const AuthSessionControllerIndex = new AuthSessionController(container.resolve(AuthSessionUseCase));
