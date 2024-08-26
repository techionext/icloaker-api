import { IRepositoryDomain } from 'Repositories/Domain/IRepositoryDomain';
import { IRepositoryUser } from 'Repositories/User/IRepositoryUser';
import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/Util/Errors/AppError';
import { ErrorDictionary } from '@shared/Util/ErrorDictionary';
import { ZODVerifyParse } from '@shared/Util/ZOD/zod';

import { DomainUpdateSchema } from './DomainUpdate.Schema';
import { IDomainUpdateDTO } from './DTO/IDomainUpdateDTO';

@injectable()
export class DomainUpdateUseCase {
  constructor(
    @inject('RepositoryUser') private RepositoryUser: IRepositoryUser,
    @inject('RepositoryDomain') private RepositoryDomain: IRepositoryDomain,
  ) {}

  async execute(request: IDomainUpdateDTO.Params) {
    const { token, id, url } = ZODVerifyParse({
      schema: DomainUpdateSchema,
      data: request,
    });

    const { data: dataUser } = await this.RepositoryUser.GetById({ id: token.id });
    if (!dataUser) throw new AppError(ErrorDictionary.USER.dataNotFound, 401);

    const { isExists: isExistsDomain, data: dataDomain } = await this.RepositoryDomain.GetById({ id, userId: dataUser.id });
    if (!isExistsDomain) throw new AppError(ErrorDictionary.DOMAINS.domainNotFoundWithUrl, 400);

    if (dataDomain?.status === 'ACTIVE') throw new AppError(ErrorDictionary.DOMAINS.domainAlreadyActivated, 400);

    await this.RepositoryDomain.Update({ id, url });

    const returnResponse = {
      ...ErrorDictionary.DOMAINS.domainUpdatedSuccessfully,
    };

    return returnResponse;
  }
}
