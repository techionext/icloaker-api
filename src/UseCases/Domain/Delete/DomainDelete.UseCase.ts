import { IRepositoryDomain } from 'Repositories/Domain/IRepositoryDomain';
import { IRepositoryUser } from 'Repositories/User/IRepositoryUser';
import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/Util/Errors/AppError';
import { ErrorDictionary } from '@shared/Util/ErrorDictionary';
import { ZODVerifyParse } from '@shared/Util/ZOD/zod';

import { DomainDeleteSchema } from './DomainDelete.Schema';
import { IDomainDeleteDTO } from './DTO/IDomainDeleteDTO';

@injectable()
export class DomainDeleteUseCase {
  constructor(
    @inject('RepositoryUser') private RepositoryUser: IRepositoryUser,
    @inject('RepositoryDomain') private RepositoryDomain: IRepositoryDomain,
  ) {}

  async execute(request: IDomainDeleteDTO.Params) {
    const { token, id } = ZODVerifyParse({
      schema: DomainDeleteSchema,
      data: request,
    });

    const { data: dataUser } = await this.RepositoryUser.GetById({ id: token.id });
    if (!dataUser) throw new AppError(ErrorDictionary.USER.dataNotFound, 401);

    const { isExists: isExistsDomain } = await this.RepositoryDomain.FindById({ id, userId: dataUser.id });
    if (!isExistsDomain) throw new AppError(ErrorDictionary.DOMAINS.domainNotFoundWithId, 400);

    await this.RepositoryDomain.Delete({ id });

    const returnResponse = {
      ...ErrorDictionary.DOMAINS.domainDeletedSuccessfully,
    };

    return returnResponse;
  }
}
