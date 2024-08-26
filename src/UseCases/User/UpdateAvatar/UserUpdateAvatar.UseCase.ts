import { IS3Service } from '@config/configMulter/Local/IS3Config';
import { IRepositoryUser } from 'Repositories/User/IRepositoryUser';
import { inject, injectable } from 'tsyringe';

import { ErrorDictionary } from '@shared/Util/ErrorDictionary';
import { AppError } from '@shared/Util/Errors/AppError';
import { ZODVerifyParse } from '@shared/Util/ZOD/zod';

import { IUserUpdateAvatarDTO } from './DTO/IUserUpdateAvatarDTO';
import { UserUpdateAvatarSchema } from './UserUpdateAvatar.Schema';

@injectable()
export class UserUpdateAvatarUseCase {
  constructor(@inject('RepositoryUser') private RepositoryUser: IRepositoryUser, @inject('S3Service') private S3Service: IS3Service) {}

  async execute(request: IUserUpdateAvatarDTO.Params) {
    const { token, avatar } = ZODVerifyParse({ schema: UserUpdateAvatarSchema, data: request });

    try {
      const { data: dataAuth } = await this.RepositoryUser.GetById({ id: token.id });
      if (!dataAuth) throw new AppError(ErrorDictionary.USER.dataNotFound);

      const { data: dataAvatar } = await this.RepositoryUser.GetAvatar({ id: dataAuth.id });
      await this.RepositoryUser.UpdateAvatar({ id: dataAuth.id, avatar: avatar.location, avatarKey: avatar.key });

      if (dataAvatar?.avatarKey) {
        await this.S3Service.DeleteImage({ key: dataAvatar.avatarKey });
      }

      const returnResponse = {
        ...ErrorDictionary.USER.avatarUpdated,
      };

      return returnResponse;
    } catch (error) {
      // verificar se vai ser necessário voltar as informações caso de erro quando atualizar o avatar e estourar algum erro no banco

      console.error(error);
      throw new AppError(ErrorDictionary.USER.avatarUploadError);
    }
  }
}
