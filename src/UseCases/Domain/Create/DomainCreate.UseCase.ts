import { IRepositoryDomain } from 'Repositories/Domain/IRepositoryDomain';
import { IRepositoryUser } from 'Repositories/User/IRepositoryUser';
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
    @inject('RepositoryUser') private RepositoryUser: IRepositoryUser,
    @inject('RepositoryDomain') private RepositoryDomain: IRepositoryDomain,
  ) {}

  async execute(request: IDomainCreateDTO.Params) {
    const { token, url } = ZODVerifyParse({
      schema: DomainCreateSchema,
      data: request,
    });

    const { data: dataUser } = await this.RepositoryUser.GetById({ id: token.id });
    if (!dataUser) throw new AppError(ErrorDictionary.USER.dataNotFound, 401);

    const { isExists: isExistsDomain } = await this.RepositoryDomain.FindByUrl({ url, userId: dataUser.id });
    if (isExistsDomain) throw new AppError(ErrorDictionary.DOMAINS.domainAlreadyRegistered, 400);

    const id = handleGenerateUuid();

    await this.RepositoryDomain.Create({
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
