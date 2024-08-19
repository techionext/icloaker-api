import { container } from 'tsyringe';

import { UsersGetByIdController } from './UsersGetById.Controller';
import { UsersGetByIdUseCase } from './UsersGetById.UseCase';

export const UsersGetByIdControllerIndex = new UsersGetByIdController(container.resolve(UsersGetByIdUseCase));
