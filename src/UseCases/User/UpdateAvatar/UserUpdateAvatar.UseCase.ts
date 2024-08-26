import { IRepositoryUser } from 'Repositories/User/IRepositoryUser';
import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/Util/Errors/AppError';
import { ErrorDictionary } from '@shared/Util/ErrorDictionary';
import { ZODVerifyParse } from '@shared/Util/ZOD/zod';

import { IUserUpdateAvatarDTO } from './DTO/IUserUpdateAvatarDTO';
import { UserUpdateAvatarSchema } from './UserUpdateAvatar.Schema';

@injectable()
export class UserUpdateAvatarUseCase {
  constructor(@inject('RepositoryUser') private RepositoryUser: IRepositoryUser) {}

  async execute(request: IUserUpdateAvatarDTO.Params) {
    const { token, avatar } = ZODVerifyParse({ schema: UserUpdateAvatarSchema, data: request });

    try {
      const { data: dataAuth } = await this.RepositoryUser.GetById({ id: token.id });
      if (!dataAuth) throw new AppError(ErrorDictionary.USER.dataNotFound);

      const { data: dataAvatar } = await this.RepositoryUser.GetAvatar({ id: dataAuth.id });
      await this.RepositoryUser.UpdateAvatar({ id: dataAuth.id, avatar: avatar.location, avatarKey: avatar.key });

      if (dataAvatar?.avatarKey) {
        // Deletar Imagem
        //await this.QueueDeleteFiles.execute({ key: dataAvatar.avatarKey, nameBucket: 'localodontorichard' });
      }

      const returnResponse = {
        ...ErrorDictionary.USER.avatarUpdated,
      };

      return returnResponse;
    } catch (error) {
      // Deletar Imagem
      //  await this.QueueDeleteFiles.execute({ key: avatar.key, nameBucket: 'localodontorichard' });

      console.error(error);
      throw new AppError(ErrorDictionary.USER.avatarUploadError);
    }
  }
}
