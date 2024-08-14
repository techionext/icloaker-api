import { IFindByIdDTO, IRepositoryRecoverPassword } from 'Repositories/RecoverPassword/IRepositoryRecoverPassword';
import { inject, injectable } from 'tsyringe';

import { VerifyDateHoursIsAfter } from '@shared/features/verifyHoursIsAfter/verifyHoursIsAfter';
import { AppError } from '@shared/Util/AppError/AppError';

@injectable()
export class ValidateForgotPasswordUseCase {
  constructor(@inject('RepositoryRecoverPassword') private RepositoryRecoverPassword: IRepositoryRecoverPassword) {}

  async execute({ id }: IFindByIdDTO.Params) {
    if (!id) throw new AppError('Enviar o id !');

    const { isExists, data } = await this.RepositoryRecoverPassword.FindById({ id });
    if (!isExists || !data) {
      return {
        isValid: false,
        message: 'Link Inválido !',
      };
    }

    const expired = VerifyDateHoursIsAfter({ hour: data.expirationAt });
    if (expired) {
      return {
        isValid: false,
        message: 'Link Expirado !',
      };
    }

    return {
      isValid: true,
      message: 'Link Válido !',
    };
  }
}
