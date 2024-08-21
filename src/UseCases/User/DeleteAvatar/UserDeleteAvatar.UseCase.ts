import { IRepositoryUser } from 'Repositories/User/IRepositoryUser';
import { inject, injectable } from 'tsyringe';

import { IQueueDeleteFiles } from '@shared/providers/Queues/DeleteFiles/DTO/IQueueFilesDelete';
import { AppError } from '@shared/Util/AppError/AppError';
import { ErrorDictionary } from '@shared/Util/ErrorDictionary';
import { ZODVerifyParse } from '@shared/Util/ZOD/zod';

import { IUserDeleteAvatarDTO } from './DTO/IUserDeleteAvatarDTO';
import { UserDeleteAvatarSchema } from './UserDeleteAvatar.Schema';

@injectable()
export class UserDeleteAvatarUseCase {
  constructor(
    @inject('RepositoryUser') private RepositoryUser: IRepositoryUser,
    @inject('QueueDeleteFiles') private QueueDeleteFiles: IQueueDeleteFiles,
  ) {}

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
      await this.QueueDeleteFiles.execute({ key: dataAvatar.avatarKey, nameBucket: 'localodontorichard' });
    }

    const returnResponse = {
      ...ErrorDictionary.USER.avatarDeleted,
    };

    return returnResponse;
  }
}
