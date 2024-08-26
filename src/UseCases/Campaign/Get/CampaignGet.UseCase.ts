import { IRepositoryCampaign } from 'Repositories/Campaign/IRepositoryCampaign';
import { IRepositoryUser } from 'Repositories/User/IRepositoryUser';
import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/Util/Errors/AppError';
import { ErrorDictionary } from '@shared/Util/ErrorDictionary';
import { ZODVerifyParse } from '@shared/Util/ZOD/zod';

import { CampaignGetSchema } from './CampaignGet.Schema';
import { ICampaignGetDTO } from './DTO/ICampaignGetDTO';

@injectable()
export class CampaignGetUseCase {
  constructor(
    @inject('RepositoryUser') private RepositoryUser: IRepositoryUser,
    @inject('RepositoryCampaign') private RepositoryCampaign: IRepositoryCampaign,
  ) {}

  async execute(request: ICampaignGetDTO.Params) {
    const { token, page, pageSize, filter } = ZODVerifyParse({
      schema: CampaignGetSchema,
      data: request,
    });

    const { data: dataUser } = await this.RepositoryUser.GetById({ id: token.id });
    if (!dataUser) throw new AppError(ErrorDictionary.USER.dataNotFound, 401);

    const { data, meta } = await this.RepositoryCampaign.Get({ page, pageSize, filter, userId: dataUser.id });

    const returnResponse = { data, meta };

    return returnResponse;
  }
}
