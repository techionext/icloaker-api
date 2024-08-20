import { IRepositoryCampaignLogs } from 'Repositories/CampaignLogs/IRepositoryCampaignLogs';
import { IRepositoryCampaigns } from 'Repositories/Campaigns/IRepositoryCampaigns';
import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/Util/AppError/AppError';
import { ErrorDictionary } from '@shared/Util/ErrorDictionary';
import { ZODVerifyParse } from '@shared/Util/ZOD/zod';

import { CampaignLogCreateSchema } from './CampaignLogCreate.Schema';
import { ICampaignLogCreateDTO } from './DTO/ICampaignLogCreateDTO';

@injectable()
export class CampaignLogCreateUseCase {
  constructor(
    @inject('RepositoryCampaigns') private RepositoryCampaigns: IRepositoryCampaigns,
    @inject('RepositoryCampaignLogs') private RepositoryCampaignLogs: IRepositoryCampaignLogs,
  ) {}

  async execute(request: ICampaignLogCreateDTO.Params) {
    const { campaignId, apiResponse, deviceInfo, ip, ipInfo, language, page, redirectTo, referer, userAgent } = ZODVerifyParse({
      schema: CampaignLogCreateSchema,
      data: request,
    });

    const { isExists } = await this.RepositoryCampaigns.FindById({ id: campaignId });
    if (!isExists)
      throw new AppError(ErrorDictionary.CAMPAIGN.campaignNotFoundWithId.message, 400, ErrorDictionary.CAMPAIGN.campaignNotFoundWithId.codeIntern);

    await this.RepositoryCampaignLogs.Create({
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
