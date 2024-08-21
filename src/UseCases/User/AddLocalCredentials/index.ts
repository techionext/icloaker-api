import { container } from 'tsyringe';

import { UserAddLocalCredentialsController } from './UserAddLocalCredentials.Controller';
import { UserAddLocalCredentialsUseCase } from './UserAddLocalCredentials.UseCase';

export const UserAddLocalCredentialsControllerIndex = new UserAddLocalCredentialsController(container.resolve(UserAddLocalCredentialsUseCase));
