import { container } from 'tsyringe';

import { UserUpdateAvatarController } from './UserUpdateAvatar.Controller';
import { UserUpdateAvatarUseCase } from './UserUpdateAvatar.UseCase';

export const UserUpdateAvatarControllerIndex = new UserUpdateAvatarController(container.resolve(UserUpdateAvatarUseCase));
