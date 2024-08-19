import { IRepositoryCampaigns } from 'Repositories/Campaigns/IRepositoryCampaigns';
import { IRepositoryUsers } from 'Repositories/User/IRepositoryUser';
import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/Util/AppError/AppError';
import { ErrorDictionary } from '@shared/Util/ErrorDictionary';
import { ZODVerifyParse } from '@shared/Util/ZOD/zod';

import { CampaignGetByIdSchema } from './CampaignGetById.Schema';
import { ICampaignGetByIdDTO } from './DTO/ICampaignGetByIdDTO';

@injectable()
export class CampaignGetByIdUseCase {
  constructor(
    @inject('RepositoryUsers') private RepositoryUsers: IRepositoryUsers,
    @inject('RepositoryCampaigns') private RepositoryCampaigns: IRepositoryCampaigns,
  ) {}

  async execute(request: ICampaignGetByIdDTO.Params) {
    const { token, id } = ZODVerifyParse({
      schema: CampaignGetByIdSchema,
      data: request,
    });

    const { data: dataUser } = await this.RepositoryUsers.FindUserById({ id: token.id });
    if (!dataUser) throw new AppError(ErrorDictionary.USER.dataNotFound.message, 401, ErrorDictionary.USER.dataNotFound.codeIntern);

    const { data, isExists: isExistsCampaign } = await this.RepositoryCampaigns.GetById({ id, userId: dataUser.id });
    if (!isExistsCampaign)
      throw new AppError(ErrorDictionary.CAMPAIGN.campaignNotFoundWithId.message, 400, ErrorDictionary.CAMPAIGN.campaignNotFoundWithId.codeIntern);

    const returnResponse = { data };

    return returnResponse;
  }
}
