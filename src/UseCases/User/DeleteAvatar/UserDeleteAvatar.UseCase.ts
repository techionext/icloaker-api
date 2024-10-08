import { IS3Service } from '@config/configMulter/Local/IS3Config';
import { IRepositoryUser } from 'Repositories/User/IRepositoryUser';
import { inject, injectable } from 'tsyringe';

import { ErrorDictionary } from '@shared/Util/ErrorDictionary';
import { AppError } from '@shared/Util/Errors/AppError';
import { ZODVerifyParse } from '@shared/Util/ZOD/zod';

import { IUserDeleteAvatarDTO } from './DTO/IUserDeleteAvatarDTO';
import { UserDeleteAvatarSchema } from './UserDeleteAvatar.Schema';

@injectable()
export class UserDeleteAvatarUseCase {
  constructor(@inject('RepositoryUser') private RepositoryUser: IRepositoryUser, @inject('S3Service') private S3Service: IS3Service) {}

  async execute(request: IUserDeleteAvatarDTO.Params) {
    const { token } = ZODVerifyParse({
      schema: UserDeleteAvatarSchema,
      data: request,
    });

    const { data: dataAuth } = await this.RepositoryUser.GetById({ id: token.id });
    if (!dataAuth) throw new AppError(ErrorDictionary.USER.dataNotFound);

    const { data: dataAvatar } = await this.RepositoryUser.GetAvatar({ id: dataAuth.id });
    if (!dataAvatar?.avatarKey) throw new AppError(ErrorDictionary.USER.noAvatarToDelete);

    if (dataAvatar.avatarKey) {
      await this.RepositoryUser.DeleteAvatar({ id: dataAuth.id });
      await this.S3Service.DeleteImage({ key: dataAvatar.avatarKey });
    }

    const returnResponse = {
      ...ErrorDictionary.USER.avatarDeleted,
    };

    return returnResponse;
  }
}
