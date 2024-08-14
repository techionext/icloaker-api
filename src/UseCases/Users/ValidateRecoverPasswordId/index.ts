import { container } from 'tsyringe';

import { ValidateForgotPasswordController } from './ValidateRecoverPassword.controller';
import { ValidateForgotPasswordUseCase } from './ValidateRecoverPassword.useCase';

export const ValidateForgotPasswordIndex = new ValidateForgotPasswordController(container.resolve(ValidateForgotPasswordUseCase));
