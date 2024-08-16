import { container } from 'tsyringe';

import { UserCreatePasswordController } from './UserCreatePassword.Controller';
import { UserCreatePasswordUseCase } from './UserCreatePassword.UseCase';

export const UserCreatePasswordControllerIndex = new UserCreatePasswordController(container.resolve(UserCreatePasswordUseCase));
