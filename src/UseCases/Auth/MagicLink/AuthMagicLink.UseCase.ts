import { IRepositoryUser } from 'Repositories/User/IRepositoryUser';
import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/Util/AppError/AppError';
import { generateToken } from '@shared/Util/configToken/generateToken';
import { ErrorDictionary } from '@shared/Util/ErrorDictionary';
import { ZODVerifyParse } from '@shared/Util/ZOD/zod';

import { AuthMagicLinkSchema } from './AuthMagicLink.Schema';
import { IAuthMagicLinkDTO } from './DTO/IAuthMagicLinkDTO';

@injectable()
export class AuthMagicLinkUseCase {
  constructor(@inject('RepositoryUser') private RepositoryUser: IRepositoryUser) {}

  async execute(request: IAuthMagicLinkDTO.Params) {
    const { id } = ZODVerifyParse({
      schema: AuthMagicLinkSchema,
      data: request,
    });

    const { data: dataMagicLink } = await this.RepositoryUser.GetMagicLinkById({ id });
    if (!dataMagicLink) throw new AppError(ErrorDictionary.USER.loginValidationFailed);

    await this.RepositoryUser.DeleteMagicLink({ id });

    const { data: dataUser } = await this.RepositoryUser.GetById({ id: dataMagicLink.userId });
    if (!dataUser) throw new AppError(ErrorDictionary.USER.dataNotFound, 401);

    const token = generateToken({ email: dataUser.email, id: dataUser.id });

    const returnResponse = {
      token,
      ...ErrorDictionary.USER.loginSuccessful,
    };

    return returnResponse;
  }
}
