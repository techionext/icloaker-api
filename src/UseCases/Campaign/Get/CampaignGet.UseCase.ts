import { IRepositoryCampaigns } from 'Repositories/Campaigns/IRepositoryCampaigns';
import { IRepositoryUsers } from 'Repositories/User/IRepositoryUser';
import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/Util/AppError/AppError';
import { ErrorDictionary } from '@shared/Util/ErrorDictionary';
import { ZODVerifyParse } from '@shared/Util/ZOD/zod';

import { CampaignGetSchema } from './CampaignGet.Schema';
import { ICampaignGetDTO } from './DTO/ICampaignGetDTO';

@injectable()
export class CampaignGetUseCase {
  constructor(
    @inject('RepositoryUsers') private RepositoryUsers: IRepositoryUsers,
    @inject('RepositoryCampaigns') private RepositoryCampaigns: IRepositoryCampaigns,
  ) {}

  async execute(request: ICampaignGetDTO.Params) {
    const { token, page, pageSize, filter } = ZODVerifyParse({
      schema: CampaignGetSchema,
      data: request,
    });

    const { data: dataUser } = await this.RepositoryUsers.FindUserById({ id: token.id });
    if (!dataUser) throw new AppError(ErrorDictionary.USER.dataNotFound.message, 401, ErrorDictionary.USER.dataNotFound.codeIntern);

    const { data, meta } = await this.RepositoryCampaigns.Get({ page, pageSize, filter, userId: dataUser.id });

    const returnResponse = { data, meta };

    return returnResponse;
  }
}
