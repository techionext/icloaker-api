import { container } from 'tsyringe';

import { UsersUpdateController } from './UsersUpdate.Controller';
import { UsersUpdateUseCase } from './UsersUpdate.UseCase';

export const UsersUpdateControllerIndex = new UsersUpdateController(container.resolve(UsersUpdateUseCase));
