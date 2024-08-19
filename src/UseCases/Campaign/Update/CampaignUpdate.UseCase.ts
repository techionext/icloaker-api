import { IRepositoryCampaigns } from 'Repositories/Campaigns/IRepositoryCampaigns';
import { IRepositoryUsers } from 'Repositories/User/IRepositoryUser';
import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/Util/AppError/AppError';
import { ErrorDictionary } from '@shared/Util/ErrorDictionary';
import { ZODVerifyParse } from '@shared/Util/ZOD/zod';

import { CampaignUpdateSchema } from './CampaignUpdate.Schema';
import { ICampaignUpdateDTO } from './DTO/ICampaignUpdateDTO';

@injectable()
export class CampaignUpdateUseCase {
  constructor(
    @inject('RepositoryUsers') private RepositoryUsers: IRepositoryUsers,
    @inject('RepositoryCampaigns') private RepositoryCampaigns: IRepositoryCampaigns,
  ) {}

  async execute(request: ICampaignUpdateDTO.Params) {
    const { token, id, countries, devices, domain, languages, manualReview, name, offerPage, origin, safePage } = ZODVerifyParse({
      schema: CampaignUpdateSchema,
      data: request,
    });

    const { data: dataUser } = await this.RepositoryUsers.FindUserById({ id: token.id });
    if (!dataUser) throw new AppError(ErrorDictionary.USER.dataNotFound.message, 401, ErrorDictionary.USER.dataNotFound.codeIntern);

    const { isExists: isExistsCampaign, data: dataCampaign } = await this.RepositoryCampaigns.GetById({ id, userId: dataUser.id });
    if (!isExistsCampaign)
      throw new AppError(ErrorDictionary.CAMPAIGN.campaignNotFoundWithId.message, 400, ErrorDictionary.CAMPAIGN.campaignNotFoundWithId.codeIntern);

    if (dataCampaign?.domainStatus === 'ACTIVE' && domain)
      throw new AppError(
        ErrorDictionary.CAMPAIGN.domainCannotBeUpdatedAfterActivation.message,
        400,
        ErrorDictionary.CAMPAIGN.domainCannotBeUpdatedAfterActivation.codeIntern,
      );

    await this.RepositoryCampaigns.Update({ id, countries, devices, domain, languages, manualReview, name, offerPage, origin, safePage });

    const returnResponse = {
      ...ErrorDictionary.CAMPAIGN.campaignUpdatedSuccessfully,
    };

    return returnResponse;
  }
}
