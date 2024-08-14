import { container } from 'tsyringe';

import { SendEmailRecoverPasswordController } from './SendEmailRecoverPassword.controller';
import { SendEmailRecoverPasswordUseCase } from './SendEmailRecoverPassword.useCase';

export const SendEmailRecoverPasswordIndex = new SendEmailRecoverPasswordController(container.resolve(SendEmailRecoverPasswordUseCase));
