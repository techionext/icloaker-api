import { IRepositoryDomain } from 'Repositories/Domain/IRepositoryDomain';
import { IRepositoryUser } from 'Repositories/User/IRepositoryUser';
import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/Util/AppError/AppError';
import { ErrorDictionary } from '@shared/Util/ErrorDictionary';
import { ZODVerifyParse } from '@shared/Util/ZOD/zod';

import { DomainGetSchema } from './DomainGet.Schema';
import { IDomainGetDTO } from './DTO/IDomainGetDTO';

@injectable()
export class DomainGetUseCase {
  constructor(
    @inject('RepositoryUser') private RepositoryUser: IRepositoryUser,
    @inject('RepositoryDomain') private RepositoryDomain: IRepositoryDomain,
  ) {}

  async execute(request: IDomainGetDTO.Params) {
    const { token, page, pageSize, filter } = ZODVerifyParse({
      schema: DomainGetSchema,
      data: request,
    });

    const { data: dataUser } = await this.RepositoryUser.GetById({ id: token.id });
    if (!dataUser) throw new AppError(ErrorDictionary.USER.dataNotFound, 401);

    const { data, meta } = await this.RepositoryDomain.Get({ page, pageSize, userId: dataUser.id, filter });

    const returnResponse = { data, meta };

    return returnResponse;
  }
}
