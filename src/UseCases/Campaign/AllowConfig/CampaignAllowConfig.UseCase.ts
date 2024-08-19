import { IRepositoryCampaigns } from 'Repositories/Campaigns/IRepositoryCampaigns';
import { IRepositoryUsers } from 'Repositories/User/IRepositoryUser';
import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/Util/AppError/AppError';
import { ErrorDictionary } from '@shared/Util/ErrorDictionary';
import { ZODVerifyParse } from '@shared/Util/ZOD/zod';

import { CampaignAllowConfigSchema } from './CampaignAllowConfig.Schema';
import { ICampaignAllowConfigDTO } from './DTO/ICampaignAllowConfigDTO';

@injectable()
export class CampaignAllowConfigUseCase {
  constructor(
    @inject('RepositoryUsers') private RepositoryUsers: IRepositoryUsers,
    @inject('RepositoryCampaigns') private RepositoryCampaigns: IRepositoryCampaigns,
  ) {}

  async execute(request: ICampaignAllowConfigDTO.Params) {
    const { id, token, allowIps, allowIsps, allowQueries, allowRefererOrigins } = ZODVerifyParse({
      schema: CampaignAllowConfigSchema,
      data: request,
    });

    const { data: dataUser } = await this.RepositoryUsers.FindUserById({ id: token.id });
    if (!dataUser) throw new AppError(ErrorDictionary.USER.dataNotFound.message, 401, ErrorDictionary.USER.dataNotFound.codeIntern);

    const { isExists: isExistsCampaign } = await this.RepositoryCampaigns.FindById({ id, userId: dataUser.id });
    if (!isExistsCampaign)
      throw new AppError(ErrorDictionary.CAMPAIGN.campaignNotFoundWithId.message, 400, ErrorDictionary.CAMPAIGN.campaignNotFoundWithId.codeIntern);

    await this.RepositoryCampaigns.UpdateAllowConfig({ allowIps, allowIsps, allowQueries, allowRefererOrigins, id });

    const returnResponse = {
      ...ErrorDictionary.CAMPAIGN.campaignAllowSettingsUpdatedSuccessfully,
    };

    return returnResponse;
  }
}
