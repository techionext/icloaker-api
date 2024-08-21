import { IRepositoryRecoverPassword } from 'Repositories/RecoverPassword/IRepositoryRecoverPassword';
import { inject, injectable } from 'tsyringe';

import { VerifyDateHoursIsAfter } from '@shared/features/verifyHoursIsAfter/verifyHoursIsAfter';
import { ErrorDictionary } from '@shared/Util/ErrorDictionary';
import { ZODVerifyParse } from '@shared/Util/ZOD/zod';

import { IUserValidatePasswordChangeDTO } from './DTO/IUserValidatePasswordChangeDTO';
import { SchemaUserValidatePasswordChange } from './UserValidatePasswordChange.Schema';

@injectable()
export class UserValidateForgotPasswordUseCase {
  constructor(@inject('RepositoryRecoverPassword') private RepositoryRecoverPassword: IRepositoryRecoverPassword) {}

  async execute(request: IUserValidatePasswordChangeDTO.Params) {
    const { id } = ZODVerifyParse({
      schema: SchemaUserValidatePasswordChange,
      data: request,
    });

    const { isExists, data } = await this.RepositoryRecoverPassword.GetById({ id });
    if (!isExists || !data) {
      return {
        isValid: false,
        ...ErrorDictionary.RECOVER_PASSWORD.linkInvalid,
      };
    }

    const expired = VerifyDateHoursIsAfter({ hour: data.expirationAt });
    if (expired) {
      return {
        isValid: false,
        ...ErrorDictionary.RECOVER_PASSWORD.linkExpired,
      };
    }

    return {
      isValid: true,
      ...ErrorDictionary.RECOVER_PASSWORD.linkValid,
    };
  }
}
