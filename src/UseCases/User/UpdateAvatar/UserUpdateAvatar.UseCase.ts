import { IRepositoryUser } from 'Repositories/User/IRepositoryUser';
import { inject, injectable } from 'tsyringe';

import { IQueueDeleteFiles } from '@shared/providers/Queues/DeleteFiles/DTO/IQueueFilesDelete';
import { AppError } from '@shared/Util/AppError/AppError';
import { ErrorDictionary } from '@shared/Util/ErrorDictionary';
import { ZODVerifyParse } from '@shared/Util/ZOD/zod';

import { IUserUpdateAvatarDTO } from './DTO/IUserUpdateAvatarDTO';
import { UserUpdateAvatarSchema } from './UserUpdateAvatar.Schema';

@injectable()
export class UserUpdateAvatarUseCase {
  constructor(
    @inject('RepositoryUser') private RepositoryUser: IRepositoryUser,
    @inject('QueueDeleteFiles') private QueueDeleteFiles: IQueueDeleteFiles,
  ) {}

  async execute(request: IUserUpdateAvatarDTO.Params) {
    const { token, avatar } = ZODVerifyParse({
      schema: UserUpdateAvatarSchema,
      data: request,
    });

    const { data: dataAuth } = await this.RepositoryUser.GetById({ id: token.id });
    if (!dataAuth) throw new AppError(ErrorDictionary.USER.dataNotFound);

    const { data: dataAvatar } = await this.RepositoryUser.GetAvatar({ id: dataAuth.id });

    try {
      await this.RepositoryUser.UpdateAvatar({ id: dataAuth.id, avatar: avatar.location, avatarKey: avatar.key });

      if (dataAvatar?.avatarKey) {
        await this.QueueDeleteFiles.execute({ key: dataAvatar.avatarKey, nameBucket: 'localodontorichard' });
      }

      const returnResponse = {
        ...ErrorDictionary.USER.avatarUpdated,
      };

      return returnResponse;
    } catch (error) {
      await this.QueueDeleteFiles.execute({ key: avatar.key, nameBucket: 'localodontorichard' });

      if (dataAvatar?.avatar && dataAvatar.avatarKey) {
        await this.RepositoryUser.UpdateAvatar({ id: dataAuth.id, avatar: dataAvatar.avatar, avatarKey: dataAvatar.avatarKey });
      }

      console.error(error);
      throw new AppError(ErrorDictionary.USER.avatarUploadError);
    }
  }
}
