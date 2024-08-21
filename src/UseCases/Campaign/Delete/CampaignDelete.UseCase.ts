import { IRepositoryCampaign } from 'Repositories/Campaign/IRepositoryCampaign';
import { IRepositoryUser } from 'Repositories/User/IRepositoryUser';
import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/Util/AppError/AppError';
import { ErrorDictionary } from '@shared/Util/ErrorDictionary';
import { ZODVerifyParse } from '@shared/Util/ZOD/zod';

import { CampaignDeleteSchema } from './CampaignDelete.Schema';
import { ICampaignDeleteDTO } from './DTO/ICampaignDeleteDTO';

@injectable()
export class CampaignDeleteUseCase {
  constructor(
    @inject('RepositoryUser') private RepositoryUser: IRepositoryUser,
    @inject('RepositoryCampaign') private RepositoryCampaign: IRepositoryCampaign,
  ) {}

  async execute(request: ICampaignDeleteDTO.Params) {
    const { token, id } = ZODVerifyParse({
      schema: CampaignDeleteSchema,
      data: request,
    });

    const { data: dataUser } = await this.RepositoryUser.GetById({ id: token.id });
    if (!dataUser) throw new AppError(ErrorDictionary.USER.dataNotFound, 401);

    const { isExists: isExistsCampaign } = await this.RepositoryCampaign.FindById({ id, userId: dataUser.id });
    if (!isExistsCampaign) throw new AppError(ErrorDictionary.CAMPAIGN.campaignNotFoundWithId, 400);

    await this.RepositoryCampaign.Delete({ id });

    const returnResponse = {
      ...ErrorDictionary.CAMPAIGN.campaignDeletedSuccessfully,
    };

    return returnResponse;
  }
}
