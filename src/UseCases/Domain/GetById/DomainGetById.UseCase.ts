import { IRepositoryDomains } from 'Repositories/Domains/IRepositoryDomains';
import { IRepositoryUsers } from 'Repositories/User/IRepositoryUser';
import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/Util/AppError/AppError';
import { ErrorDictionary } from '@shared/Util/ErrorDictionary';
import { ZODVerifyParse } from '@shared/Util/ZOD/zod';

import { DomainGetByIdSchema } from './DomainGetById.Schema';
import { IDomainGetByIdDTO } from './DTO/IDomainGetByIdDTO';

@injectable()
export class DomainGetByIdUseCase {
  constructor(
    @inject('RepositoryUsers') private RepositoryUsers: IRepositoryUsers,
    @inject('RepositoryDomains') private RepositoryDomains: IRepositoryDomains,
  ) {}

  async execute(request: IDomainGetByIdDTO.Params) {
    const { token, id } = ZODVerifyParse({
      schema: DomainGetByIdSchema,
      data: request,
    });

    const { data: dataUser } = await this.RepositoryUsers.FindUserById({ id: token.id });
    if (!dataUser) throw new AppError(ErrorDictionary.USER.dataNotFound.message, 401, ErrorDictionary.USER.dataNotFound.codeIntern);

    const { data } = await this.RepositoryDomains.GetById({ id, userId: dataUser.id });

    const returnResponse = { data };

    return returnResponse;
  }
}
