import { IRepositoryDomains } from 'Repositories/Domains/IRepositoryDomains';
import { IRepositoryUsers } from 'Repositories/User/IRepositoryUser';
import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/Util/AppError/AppError';
import { ErrorDictionary } from '@shared/Util/ErrorDictionary';
import { ZODVerifyParse } from '@shared/Util/ZOD/zod';

import { DomainDeleteSchema } from './DomainDelete.Schema';
import { IDomainDeleteDTO } from './DTO/IDomainDeleteDTO';

@injectable()
export class DomainDeleteUseCase {
  constructor(
    @inject('RepositoryUsers') private RepositoryUsers: IRepositoryUsers,
    @inject('RepositoryDomains') private RepositoryDomains: IRepositoryDomains,
  ) {}

  async execute(request: IDomainDeleteDTO.Params) {
    const { token, id } = ZODVerifyParse({
      schema: DomainDeleteSchema,
      data: request,
    });

    const { data: dataUser } = await this.RepositoryUsers.FindUserById({ id: token.id });
    if (!dataUser) throw new AppError(ErrorDictionary.USER.dataNotFound.message, 401, ErrorDictionary.USER.dataNotFound.codeIntern);

    const { isExists: isExistsDomain } = await this.RepositoryDomains.FindById({ id, userId: dataUser.id });
    if (!isExistsDomain)
      throw new AppError(ErrorDictionary.DOMAINS.domainNotFoundWithId.message, 400, ErrorDictionary.DOMAINS.domainNotFoundWithId.codeIntern);

    await this.RepositoryDomains.Delete({ id });

    const returnResponse = {
      ...ErrorDictionary.DOMAINS.domainDeletedSuccessfully,
    };

    return returnResponse;
  }
}
