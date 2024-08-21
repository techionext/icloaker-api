import { container } from 'tsyringe';

import { UserCreateController } from './UserCreate.Controller';
import { UserCreateUseCase } from './UserCreate.UseCase';

export const UserCreateControllerIndex = new UserCreateController(container.resolve(UserCreateUseCase));
