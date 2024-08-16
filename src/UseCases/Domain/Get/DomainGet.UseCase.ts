import { IRepositoryDomains } from 'Repositories/Domains/IRepositoryDomains';
import { IRepositoryUsers } from 'Repositories/User/IRepositoryUser';
import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/Util/AppError/AppError';
import { ErrorDictionary } from '@shared/Util/ErrorDictionary';
import { ZODVerifyParse } from '@shared/Util/ZOD/zod';

import { DomainGetSchema } from './DomainGet.Schema';
import { IDomainGetDTO } from './DTO/IDomainGetDTO';

@injectable()
export class DomainGetUseCase {
  constructor(
    @inject('RepositoryUsers') private RepositoryUsers: IRepositoryUsers,
    @inject('RepositoryDomains') private RepositoryDomains: IRepositoryDomains,
  ) {}

  async execute(request: IDomainGetDTO.Params) {
    const { token, page, pageSize, filter } = ZODVerifyParse({
      schema: DomainGetSchema,
      data: request,
    });

    const { data: dataUser } = await this.RepositoryUsers.FindUserById({ id: token.id });
    if (!dataUser) throw new AppError(ErrorDictionary.USER.dataNotFound.message, 401, ErrorDictionary.USER.dataNotFound.codeIntern);

    const { data, meta } = await this.RepositoryDomains.Get({ page, pageSize, userId: dataUser.id, filter });

    const returnResponse = { data, meta };

    return returnResponse;
  }
}
