import { container } from 'tsyringe';

import { UserRequestPasswordChangeController } from './UserRequestPasswordChange.Controller';
import { UserRequestPasswordChangeUseCase } from './UserRequestPasswordChange.UseCase';

export const UserRequestPasswordChangeControllerIndex = new UserRequestPasswordChangeController(container.resolve(UserRequestPasswordChangeUseCase));
