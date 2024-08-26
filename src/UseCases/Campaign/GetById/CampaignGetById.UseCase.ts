import { IRepositoryCampaign } from 'Repositories/Campaign/IRepositoryCampaign';
import { IRepositoryUser } from 'Repositories/User/IRepositoryUser';
import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/Util/Errors/AppError';
import { ErrorDictionary } from '@shared/Util/ErrorDictionary';
import { ZODVerifyParse } from '@shared/Util/ZOD/zod';

import { CampaignGetByIdSchema } from './CampaignGetById.Schema';
import { ICampaignGetByIdDTO } from './DTO/ICampaignGetByIdDTO';

@injectable()
export class CampaignGetByIdUseCase {
  constructor(
    @inject('RepositoryUser') private RepositoryUser: IRepositoryUser,
    @inject('RepositoryCampaign') private RepositoryCampaign: IRepositoryCampaign,
  ) {}

  async execute(request: ICampaignGetByIdDTO.Params) {
    const { token, id } = ZODVerifyParse({
      schema: CampaignGetByIdSchema,
      data: request,
    });

    const { data: dataUser } = await this.RepositoryUser.GetById({ id: token.id });
    if (!dataUser) throw new AppError(ErrorDictionary.USER.dataNotFound, 401);

    const { data, isExists: isExistsCampaign } = await this.RepositoryCampaign.GetById({ id, userId: dataUser.id });
    if (!isExistsCampaign) throw new AppError(ErrorDictionary.CAMPAIGN.campaignNotFoundWithId, 400);

    const returnResponse = { data };

    return returnResponse;
  }
}
