import { container } from 'tsyringe';

import { UserUpdateController } from './UserUpdate.Controller';
import { UserUpdateUseCase } from './UserUpdate.UseCase';

export const UserUpdateControllerIndex = new UserUpdateController(container.resolve(UserUpdateUseCase));
