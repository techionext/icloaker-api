import { IRepositoryRecoverPassword } from 'Repositories/RecoverPassword/IRepositoryRecoverPassword';
import { IRepositoryUsers } from 'Repositories/User/IRepositoryUser';
import { inject, injectable } from 'tsyringe';

import { VerifyDateHoursIsAfter } from '@shared/features/verifyHoursIsAfter/verifyHoursIsAfter';
import { handleCreateHash } from '@shared/Util/configHashPassword/handleCreatehash';
import { ZODVerifyParse } from '@shared/Util/ZOD/zod';

import { IRecoverPasswordDTO } from './DTO/IRecoverPasswordDTO';
import { SchemaRecoverPassword } from './SchemaRecoverPassword';

@injectable()
export class RecoverPasswordUseCase {
  constructor(
    @inject('RepositoryUsers') private RepositoryUsers: IRepositoryUsers,
    @inject('RepositoryRecoverPassword') private RepositoryRecoverPassword: IRepositoryRecoverPassword,
  ) {}

  async execute(request: IRecoverPasswordDTO.Params) {
    const { id, password } = ZODVerifyParse({
      schema: SchemaRecoverPassword,
      data: request,
    });

    const { isExists, data: dataRecoverPassword } = await this.RepositoryRecoverPassword.FindById({ id });
    if (!isExists || !dataRecoverPassword) {
      const errorReturn = {
        isValid: false,
        messagE: 'Link não existe !',
      };

      return errorReturn;
    }

    const expired = VerifyDateHoursIsAfter({ hour: dataRecoverPassword.expirationAt });

    if (expired) {
      return {
        isValid: false,
        message: 'Link Expirado !',
      };
    }

    const hashPassword = handleCreateHash(password);

    await this.RepositoryUsers.UpdatePassword({ id: dataRecoverPassword.userId, password: hashPassword });

    await this.RepositoryRecoverPassword.DeleteById({ id });

    const responseReturn = {
      isValid: true,
      message: 'Senha alterada com sucesso !',
    };

    return responseReturn;
  }
}
