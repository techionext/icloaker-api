import { IRepositoryCampaign } from 'Repositories/Campaign/IRepositoryCampaign';
import { IRepositoryUser } from 'Repositories/User/IRepositoryUser';
import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/Util/Errors/AppError';
import { ErrorDictionary } from '@shared/Util/ErrorDictionary';
import { ZODVerifyParse } from '@shared/Util/ZOD/zod';

import { CampaignDenyConfigSchema } from './CampaignDenyConfig.Schema';
import { ICampaignDenyConfigDTO } from './DTO/ICampaignDenyConfigDTO';

@injectable()
export class CampaignDenyConfigUseCase {
  constructor(
    @inject('RepositoryUser') private RepositoryUser: IRepositoryUser,
    @inject('RepositoryCampaign') private RepositoryCampaign: IRepositoryCampaign,
  ) {}

  async execute(request: ICampaignDenyConfigDTO.Params) {
    const { id, token, antiSpy, denyCountries, denyIps, denyIsps, denyLanguages, denyQueries, denyRefererOrigins } = ZODVerifyParse({
      schema: CampaignDenyConfigSchema,
      data: request,
    });

    const { data: dataUser } = await this.RepositoryUser.GetById({ id: token.id });
    if (!dataUser) throw new AppError(ErrorDictionary.USER.dataNotFound, 401);

    const { isExists: isExistsCampaign } = await this.RepositoryCampaign.FindById({ id, userId: dataUser.id });
    if (!isExistsCampaign) throw new AppError(ErrorDictionary.CAMPAIGN.campaignNotFoundWithId, 400);

    await this.RepositoryCampaign.UpdateDenyConfig({
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
