import { container } from 'tsyringe';

import { CreateUserController } from './CreateUser.Controller';
import { CreateUserUseCase } from './CreateUser.UseCase';

export const CreateUserControllerIndex = new CreateUserController(container.resolve(CreateUserUseCase));
