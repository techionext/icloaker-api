import { IRepositoryDomains } from 'Repositories/Domains/IRepositoryDomains';
import { IRepositoryUsers } from 'Repositories/User/IRepositoryUser';
import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/Util/AppError/AppError';
import { ErrorDictionary } from '@shared/Util/ErrorDictionary';
import { ZODVerifyParse } from '@shared/Util/ZOD/zod';

import { DomainUpdateSchema } from './DomainUpdate.Schema';
import { IDomainUpdateDTO } from './DTO/IDomainUpdateDTO';

@injectable()
export class DomainUpdateUseCase {
  constructor(
    @inject('RepositoryUsers') private RepositoryUsers: IRepositoryUsers,
    @inject('RepositoryDomains') private RepositoryDomains: IRepositoryDomains,
  ) {}

  async execute(request: IDomainUpdateDTO.Params) {
    const { token, id, url } = ZODVerifyParse({
      schema: DomainUpdateSchema,
      data: request,
    });

    const { data: dataUser } = await this.RepositoryUsers.FindUserById({ id: token.id });
    if (!dataUser) throw new AppError(ErrorDictionary.USER.dataNotFound.message, 401, ErrorDictionary.USER.dataNotFound.codeIntern);

    const { isExists: isExistsDomain, data: dataDomain } = await this.RepositoryDomains.GetById({ id, userId: dataUser.id });
    if (!isExistsDomain)
      throw new AppError(ErrorDictionary.DOMAINS.domainNotFoundWithUrl.message, 400, ErrorDictionary.DOMAINS.domainNotFoundWithUrl.codeIntern);

    if (dataDomain?.status === 'ACTIVE')
      throw new AppError(ErrorDictionary.DOMAINS.domainAlreadyActivated.message, 400, ErrorDictionary.DOMAINS.domainAlreadyActivated.codeIntern);

    await this.RepositoryDomains.Update({ id, url });

    const returnResponse = {
      ...ErrorDictionary.DOMAINS.domainUpdatedSuccessfully,
    };

    return returnResponse;
  }
}
