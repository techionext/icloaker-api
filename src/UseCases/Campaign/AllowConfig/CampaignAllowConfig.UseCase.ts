import { IRepositoryCampaign } from 'Repositories/Campaign/IRepositoryCampaign';
import { IRepositoryUser } from 'Repositories/User/IRepositoryUser';
import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/Util/AppError/AppError';
import { ErrorDictionary } from '@shared/Util/ErrorDictionary';
import { ZODVerifyParse } from '@shared/Util/ZOD/zod';

import { CampaignAllowConfigSchema } from './CampaignAllowConfig.Schema';
import { ICampaignAllowConfigDTO } from './DTO/ICampaignAllowConfigDTO';

@injectable()
export class CampaignAllowConfigUseCase {
  constructor(
    @inject('RepositoryUser') private RepositoryUser: IRepositoryUser,
    @inject('RepositoryCampaign') private RepositoryCampaign: IRepositoryCampaign,
  ) {}

  async execute(request: ICampaignAllowConfigDTO.Params) {
    const { id, token, allowIps, allowIsps, allowQueries, allowRefererOrigins } = ZODVerifyParse({
      schema: CampaignAllowConfigSchema,
      data: request,
    });

    const { data: dataUser } = await this.RepositoryUser.GetById({ id: token.id });
    if (!dataUser) throw new AppError(ErrorDictionary.USER.dataNotFound, 401);

    const { isExists: isExistsCampaign } = await this.RepositoryCampaign.FindById({ id, userId: dataUser.id });
    if (!isExistsCampaign) throw new AppError(ErrorDictionary.CAMPAIGN.campaignNotFoundWithId, 400);

    await this.RepositoryCampaign.UpdateAllowConfig({ allowIps, allowIsps, allowQueries, allowRefererOrigins, id });

    const returnResponse = {
      ...ErrorDictionary.CAMPAIGN.campaignAllowSettingsUpdatedSuccessfully,
    };

    return returnResponse;
  }
}
