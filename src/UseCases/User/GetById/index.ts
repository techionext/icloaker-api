import { container } from 'tsyringe';

import { UserGetByIdController } from './UserGetById.Controller';
import { UserGetByIdUseCase } from './UserGetById.UseCase';

export const UserGetByIdControllerIndex = new UserGetByIdController(container.resolve(UserGetByIdUseCase));
