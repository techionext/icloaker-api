import { IRepositoryCampaign } from 'Repositories/Campaign/IRepositoryCampaign';
import { IRepositoryCampaignLog } from 'Repositories/CampaignLog/IRepositoryCampaignLog';
import { IRepositoryUser } from 'Repositories/User/IRepositoryUser';
import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/Util/AppError/AppError';
import { ErrorDictionary } from '@shared/Util/ErrorDictionary';
import { ZODVerifyParse } from '@shared/Util/ZOD/zod';

import { CampaignLogGetSchema } from './CampaignLogGet.Schema';
import { ICampaignLogGetDTO } from './DTO/ICampaignLogGetDTO';

@injectable()
export class CampaignLogGetUseCase {
  constructor(
    @inject('RepositoryUser') private RepositoryUser: IRepositoryUser,
    @inject('RepositoryCampaign') private RepositoryCampaign: IRepositoryCampaign,
    @inject('RepositoryCampaignLog') private RepositoryCampaignLog: IRepositoryCampaignLog,
  ) {}

  async execute(request: ICampaignLogGetDTO.Params) {
    const { campaignId, page, pageSize, token } = ZODVerifyParse({
      schema: CampaignLogGetSchema,
      data: request,
    });

    const { data: dataUser } = await this.RepositoryUser.GetById({ id: token.id });
    if (!dataUser) throw new AppError(ErrorDictionary.USER.dataNotFound, 401);

    const { isExists } = await this.RepositoryCampaign.FindById({ id: campaignId, userId: dataUser.id });
    if (!isExists) throw new AppError(ErrorDictionary.CAMPAIGN.campaignNotFoundWithId, 400);

    const { data, meta } = await this.RepositoryCampaignLog.Get({ campaignId, page, pageSize });

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
