import { IRepositoryCampaign } from 'Repositories/Campaign/IRepositoryCampaign';
import { IRepositoryUser } from 'Repositories/User/IRepositoryUser';
import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/Util/AppError/AppError';
import { ErrorDictionary } from '@shared/Util/ErrorDictionary';
import { ZODVerifyParse } from '@shared/Util/ZOD/zod';

import { CampaignUpdateSchema } from './CampaignUpdate.Schema';
import { ICampaignUpdateDTO } from './DTO/ICampaignUpdateDTO';

@injectable()
export class CampaignUpdateUseCase {
  constructor(
    @inject('RepositoryUser') private RepositoryUser: IRepositoryUser,
    @inject('RepositoryCampaign') private RepositoryCampaign: IRepositoryCampaign,
  ) {}

  async execute(request: ICampaignUpdateDTO.Params) {
    const { token, id, countries, devices, domain, languages, manualReview, name, offerPage, origin, safePage } = ZODVerifyParse({
      schema: CampaignUpdateSchema,
      data: request,
    });

    const { data: dataUser } = await this.RepositoryUser.GetById({ id: token.id });
    if (!dataUser) throw new AppError(ErrorDictionary.USER.dataNotFound, 401);

    const { isExists: isExistsCampaign, data: dataCampaign } = await this.RepositoryCampaign.GetById({ id, userId: dataUser.id });
    if (!isExistsCampaign) throw new AppError(ErrorDictionary.CAMPAIGN.campaignNotFoundWithId, 400);

    if (dataCampaign?.domainStatus === 'ACTIVE' && domain) throw new AppError(ErrorDictionary.CAMPAIGN.domainCannotBeUpdatedAfterActivation, 400);

    await this.RepositoryCampaign.Update({ id, countries, devices, domain, languages, manualReview, name, offerPage, origin, safePage });

    const returnResponse = {
      ...ErrorDictionary.CAMPAIGN.campaignUpdatedSuccessfully,
    };

    return returnResponse;
  }
}
