import { IRepositoryCampaigns } from 'Repositories/Campaigns/IRepositoryCampaigns';
import { IRepositoryUsers } from 'Repositories/User/IRepositoryUser';
import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/Util/AppError/AppError';
import { ErrorDictionary } from '@shared/Util/ErrorDictionary';
import { ZODVerifyParse } from '@shared/Util/ZOD/zod';

import { CampaignDenyConfigSchema } from './CampaignDenyConfig.Schema';
import { ICampaignDenyConfigDTO } from './DTO/ICampaignDenyConfigDTO';

@injectable()
export class CampaignDenyConfigUseCase {
  constructor(
    @inject('RepositoryUsers') private RepositoryUsers: IRepositoryUsers,
    @inject('RepositoryCampaigns') private RepositoryCampaigns: IRepositoryCampaigns,
  ) {}

  async execute(request: ICampaignDenyConfigDTO.Params) {
    const { id, token, antiSpy, denyCountries, denyIps, denyIsps, denyLanguages, denyQueries, denyRefererOrigins } = ZODVerifyParse({
      schema: CampaignDenyConfigSchema,
      data: request,
    });

    const { data: dataUser } = await this.RepositoryUsers.FindUserById({ id: token.id });
    if (!dataUser) throw new AppError(ErrorDictionary.USER.dataNotFound.message, 401, ErrorDictionary.USER.dataNotFound.codeIntern);

    const { isExists: isExistsCampaign } = await this.RepositoryCampaigns.FindById({ id, userId: dataUser.id });
    if (!isExistsCampaign)
      throw new AppError(ErrorDictionary.CAMPAIGN.campaignNotFoundWithId.message, 400, ErrorDictionary.CAMPAIGN.campaignNotFoundWithId.codeIntern);

    await this.RepositoryCampaigns.UpdateDenyConfig({
      id,
      denyIps,
      antiSpy,
      denyIsps,
      denyQueries,
      denyCountries,
      denyLanguages,
      denyRefererOrigins,
    });

    const returnResponse = {
      ...ErrorDictionary.CAMPAIGN.campaignDenySettingsUpdatedSuccessfully,
    };

    return returnResponse;
  }
}
