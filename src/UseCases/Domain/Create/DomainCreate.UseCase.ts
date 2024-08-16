import { IRepositoryDomains } from 'Repositories/Domains/IRepositoryDomains';
import { IRepositoryUsers } from 'Repositories/User/IRepositoryUser';
import { inject, injectable } from 'tsyringe';

import { handleGenerateUuid } from '@shared/features/handleGenerateUuid/handleGenerateUuid';
import { AppError } from '@shared/Util/AppError/AppError';
import { ErrorDictionary } from '@shared/Util/ErrorDictionary';
import { ZODVerifyParse } from '@shared/Util/ZOD/zod';

import { DomainCreateSchema } from './DomainCreate.Schema';
import { IDomainCreateDTO } from './DTO/IDomainCreateDTO';

@injectable()
export class DomainCreateUseCase {
  constructor(
    @inject('RepositoryUsers') private RepositoryUsers: IRepositoryUsers,
    @inject('RepositoryDomains') private RepositoryDomains: IRepositoryDomains,
  ) {}

  async execute(request: IDomainCreateDTO.Params) {
    const { token, url } = ZODVerifyParse({
      schema: DomainCreateSchema,
      data: request,
    });

    const { data: dataUser } = await this.RepositoryUsers.FindUserById({ id: token.id });
    if (!dataUser) throw new AppError(ErrorDictionary.USER.dataNotFound.message, 401, ErrorDictionary.USER.dataNotFound.codeIntern);

    const { isExists: isExistsDomain } = await this.RepositoryDomains.FindByUrl({ url, userId: dataUser.id });
    if (isExistsDomain)
      throw new AppError(ErrorDictionary.DOMAINS.domainAlreadyRegistered.message, 400, ErrorDictionary.DOMAINS.domainAlreadyRegistered.codeIntern);

    const id = handleGenerateUuid();

    await this.RepositoryDomains.Create({
      id,
      url,
      userId: dataUser.id,
    });

    const returnResponse = {
      id,
      ...ErrorDictionary.DOMAINS.domainRegisteredSuccessfully,
    };

    return returnResponse;
  }
}
