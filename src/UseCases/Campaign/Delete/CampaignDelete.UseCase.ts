import { IRepositoryCampaigns } from 'Repositories/Campaigns/IRepositoryCampaigns';
import { IRepositoryUsers } from 'Repositories/User/IRepositoryUser';
import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/Util/AppError/AppError';
import { ErrorDictionary } from '@shared/Util/ErrorDictionary';
import { ZODVerifyParse } from '@shared/Util/ZOD/zod';

import { CampaignDeleteSchema } from './CampaignDelete.Schema';
import { ICampaignDeleteDTO } from './DTO/ICampaignDeleteDTO';

@injectable()
export class CampaignDeleteUseCase {
  constructor(
    @inject('RepositoryUsers') private RepositoryUsers: IRepositoryUsers,
    @inject('RepositoryCampaigns') private RepositoryCampaigns: IRepositoryCampaigns,
  ) {}

  async execute(request: ICampaignDeleteDTO.Params) {
    const { token, id } = ZODVerifyParse({
      schema: CampaignDeleteSchema,
      data: request,
    });

    const { data: dataUser } = await this.RepositoryUsers.FindUserById({ id: token.id });
    if (!dataUser) throw new AppError(ErrorDictionary.USER.dataNotFound.message, 401, ErrorDictionary.USER.dataNotFound.codeIntern);

    const { isExists: isExistsCampaign } = await this.RepositoryCampaigns.FindById({ id, userId: dataUser.id });
    if (!isExistsCampaign)
      throw new AppError(ErrorDictionary.CAMPAIGN.campaignNotFoundWithId.message, 400, ErrorDictionary.CAMPAIGN.campaignNotFoundWithId.codeIntern);

    await this.RepositoryCampaigns.Delete({ id });

    const returnResponse = {
      ...ErrorDictionary.CAMPAIGN.campaignDeletedSuccessfully,
    };

    return returnResponse;
  }
}
