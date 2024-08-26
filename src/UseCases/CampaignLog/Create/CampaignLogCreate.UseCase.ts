import { IRepositoryCampaign } from 'Repositories/Campaign/IRepositoryCampaign';
import { IRepositoryCampaignLog } from 'Repositories/CampaignLog/IRepositoryCampaignLog';
import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/Util/Errors/AppError';
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
    const { campaignId, apiResponse, ipInfo, pageUrl, redirectTo, refererPage, requestInfo } = ZODVerifyParse({
      schema: CampaignLogCreateSchema,
      data: request,
    });

    const { isExists } = await this.RepositoryCampaign.FindById({ id: campaignId });
    if (!isExists) throw new AppError(ErrorDictionary.CAMPAIGN.campaignNotFoundWithId, 400);

    await this.RepositoryCampaignLog.Create({
      pageUrl,
      campaignId,
      redirectTo,
      refererPage,
      apiResponse,
      ipInfo: JSON.stringify(ipInfo),
      requestInfo: JSON.stringify(requestInfo),
    });

    const returnResponse = {
      ...ErrorDictionary.CAMPAIGN.campaignLogCreatedSuccessfully,
    };

    return returnResponse;
  }
}
