import { IRepositoryRecoverPassword } from 'Repositories/RecoverPassword/IRepositoryRecoverPassword';
import { IRepositoryUser } from 'Repositories/User/IRepositoryUser';
import { inject, injectable } from 'tsyringe';

import { VerifyDateHoursIsAfter } from '@shared/features/verifyHoursIsAfter/verifyHoursIsAfter';
import { handleCreateHash } from '@shared/Util/configHashPassword/handleCreatehash';
import { ErrorDictionary } from '@shared/Util/ErrorDictionary';
import { ZODVerifyParse } from '@shared/Util/ZOD/zod';

import { IUserConfirmPasswordChangeDTO } from './DTO/IUserConfirmPasswordChangeDTO';
import { SchemaUserConfirmPasswordChange } from './UserConfirmPasswordChange.Schema';

@injectable()
export class UserConfirmPasswordChangeUseCase {
  constructor(
    @inject('RepositoryUser') private RepositoryUser: IRepositoryUser,
    @inject('RepositoryRecoverPassword') private RepositoryRecoverPassword: IRepositoryRecoverPassword,
  ) {}

  async execute(request: IUserConfirmPasswordChangeDTO.Params) {
    const { id, password } = ZODVerifyParse({
      schema: SchemaUserConfirmPasswordChange,
      data: request,
    });

    const { isExists, data: dataUserConfirmPasswordChange } = await this.RepositoryRecoverPassword.GetById({ id });
    if (!isExists || !dataUserConfirmPasswordChange) {
      const errorReturn = {
        isValid: false,
        ...ErrorDictionary.RECOVER_PASSWORD.linkNotFound,
      };

      return errorReturn;
    }

    const expired = VerifyDateHoursIsAfter({ hour: dataUserConfirmPasswordChange.expirationAt });

    if (expired) {
      return {
        isValid: false,
        ...ErrorDictionary.RECOVER_PASSWORD.linkExpired,
      };
    }

    const hashPassword = handleCreateHash(password);

    await this.RepositoryUser.UpdatePassword({ id: dataUserConfirmPasswordChange.userId, password: hashPassword });

    await this.RepositoryRecoverPassword.DeleteById({ id });

    const responseReturn = {
      isValid: true,
      ...ErrorDictionary.RECOVER_PASSWORD.passwordChanged,
    };

    return responseReturn;
  }
}
