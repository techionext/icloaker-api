import { container } from 'tsyringe';

import { UserConfirmPasswordChangeController } from './UserConfirmPasswordChange.Controller';
import { UserConfirmPasswordChangeUseCase } from './UserConfirmPasswordChange.UseCase';

export const UserConfirmPasswordChangeControllerIndex = new UserConfirmPasswordChangeController(container.resolve(UserConfirmPasswordChangeUseCase));
