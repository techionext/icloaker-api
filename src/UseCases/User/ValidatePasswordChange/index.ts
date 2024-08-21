import { container } from 'tsyringe';

import { UserValidateForgotPasswordController } from './UserValidatePasswordChange.Controller';
import { UserValidateForgotPasswordUseCase } from './UserValidatePasswordChange.UseCase';

export const UserValidateForgotPasswordControllerIndex = new UserValidateForgotPasswordController(
  container.resolve(UserValidateForgotPasswordUseCase),
);
