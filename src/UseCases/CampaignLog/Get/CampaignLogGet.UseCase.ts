import { IRepositoryCampaignLogs } from 'Repositories/CampaignLogs/IRepositoryCampaignLogs';
import { IRepositoryCampaigns } from 'Repositories/Campaigns/IRepositoryCampaigns';
import { IRepositoryUsers } from 'Repositories/User/IRepositoryUser';
import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/Util/AppError/AppError';
import { ErrorDictionary } from '@shared/Util/ErrorDictionary';
import { ZODVerifyParse } from '@shared/Util/ZOD/zod';

import { CampaignLogGetSchema } from './CampaignLogGet.Schema';
import { ICampaignLogGetDTO } from './DTO/ICampaignLogGetDTO';

@injectable()
export class CampaignLogGetUseCase {
  constructor(
    @inject('RepositoryUsers') private RepositoryUsers: IRepositoryUsers,
    @inject('RepositoryCampaigns') private RepositoryCampaigns: IRepositoryCampaigns,
    @inject('RepositoryCampaignLogs') private RepositoryCampaignLogs: IRepositoryCampaignLogs,
  ) {}

  async execute(request: ICampaignLogGetDTO.Params) {
    const { campaignId, page, pageSize, token } = ZODVerifyParse({
      schema: CampaignLogGetSchema,
      data: request,
    });

    const { data: dataUser } = await this.RepositoryUsers.FindUserById({ id: token.id });
    if (!dataUser) throw new AppError(ErrorDictionary.USER.dataNotFound.message, 401, ErrorDictionary.USER.dataNotFound.codeIntern);

    const { isExists } = await this.RepositoryCampaigns.FindById({ id: campaignId, userId: dataUser.id });
    if (!isExists)
      throw new AppError(ErrorDictionary.CAMPAIGN.campaignNotFoundWithId.message, 400, ErrorDictionary.CAMPAIGN.campaignNotFoundWithId.codeIntern);

    const { data, meta } = await this.RepositoryCampaignLogs.Get({ campaignId, page, pageSize });

    const returnResponse = {
      data: data.map((item) => ({
        ...item,
        ipInfo: item.ipInfo ? JSON.parse(item.ipInfo.toString()) : null,
        deviceInfo: item.deviceInfo ? JSON.parse(item.deviceInfo.toString()) : null,
      })),
      meta,
    };

    return returnResponse;
  }
}
