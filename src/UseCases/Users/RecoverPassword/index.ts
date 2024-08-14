import { container } from 'tsyringe';

import { RecoverPasswordController } from './RecoverPassword.controller';
import { RecoverPasswordUseCase } from './RecoverPassword.useCase';

export const RecoverPasswordIndex = new RecoverPasswordController(container.resolve(RecoverPasswordUseCase));
