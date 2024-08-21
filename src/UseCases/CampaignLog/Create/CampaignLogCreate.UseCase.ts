import { IRepositoryCampaign } from 'Repositories/Campaign/IRepositoryCampaign';
import { IRepositoryCampaignLog } from 'Repositories/CampaignLog/IRepositoryCampaignLog';
import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/Util/AppError/AppError';
import { ErrorDictionary } from '@shared/Util/ErrorDictionary';
import { ZODVerifyParse } from '@shared/Util/ZOD/zod';

import { CampaignLogCreateSchema } from './CampaignLogCreate.Schema';
import { ICampaignLogCreateDTO } from './DTO/ICampaignLogCreateDTO';

@injectable()
export class CampaignLogCreateUseCase {
  constructor(
    @inject('RepositoryCampaign') private RepositoryCampaign: IRepositoryCampaign,
    @inject('RepositoryCampaignLog') private RepositoryCampaignLog: IRepositoryCampaignLog,
  ) {}

  async execute(request: ICampaignLogCreateDTO.Params) {
    const { campaignId, apiResponse, deviceInfo, ip, ipInfo, language, page, redirectTo, referer, userAgent } = ZODVerifyParse({
      schema: CampaignLogCreateSchema,
      data: request,
    });

    const { isExists } = await this.RepositoryCampaign.FindById({ id: campaignId });
    if (!isExists) throw new AppError(ErrorDictionary.CAMPAIGN.campaignNotFoundWithId, 400);

    await this.RepositoryCampaignLog.Create({
      ip,
      page,
      referer,
      language,
      userAgent,
      redirectTo,
      campaignId,
      apiResponse,
      ipInfo: JSON.stringify(ipInfo),
      deviceInfo: JSON.stringify(deviceInfo),
    });

    const returnResponse = {
      ...ErrorDictionary.CAMPAIGN.campaignLogCreatedSuccessfully,
    };

    return returnResponse;
  }
}
