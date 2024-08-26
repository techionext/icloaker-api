import { IRepositoryDomain } from 'Repositories/Domain/IRepositoryDomain';
import { IRepositoryUser } from 'Repositories/User/IRepositoryUser';
import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/Util/Errors/AppError';
import { ErrorDictionary } from '@shared/Util/ErrorDictionary';
import { ZODVerifyParse } from '@shared/Util/ZOD/zod';

import { DomainGetByIdSchema } from './DomainGetById.Schema';
import { IDomainGetByIdDTO } from './DTO/IDomainGetByIdDTO';

@injectable()
export class DomainGetByIdUseCase {
  constructor(
    @inject('RepositoryUser') private RepositoryUser: IRepositoryUser,
    @inject('RepositoryDomain') private RepositoryDomain: IRepositoryDomain,
  ) {}

  async execute(request: IDomainGetByIdDTO.Params) {
    const { token, id } = ZODVerifyParse({
      schema: DomainGetByIdSchema,
      data: request,
    });

    const { data: dataUser } = await this.RepositoryUser.GetById({ id: token.id });
    if (!dataUser) throw new AppError(ErrorDictionary.USER.dataNotFound, 401);

    const { data } = await this.RepositoryDomain.GetById({ id, userId: dataUser.id });

    const returnResponse = { data };

    return returnResponse;
  }
}
