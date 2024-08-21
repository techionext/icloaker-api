import { container } from 'tsyringe';

import { UserDeleteAvatarController } from './UserDeleteAvatar.Controller';
import { UserDeleteAvatarUseCase } from './UserDeleteAvatar.UseCase';

export const UserDeleteAvatarControllerIndex = new UserDeleteAvatarController(container.resolve(UserDeleteAvatarUseCase));
