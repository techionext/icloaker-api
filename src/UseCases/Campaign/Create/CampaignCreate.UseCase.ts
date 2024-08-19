import { IRepositoryCampaigns } from 'Repositories/Campaigns/IRepositoryCampaigns';
import { IRepositoryUsers } from 'Repositories/User/IRepositoryUser';
import { inject, injectable } from 'tsyringe';

import { handleGenerateUuid } from '@shared/features/handleGenerateUuid/handleGenerateUuid';
import { AppError } from '@shared/Util/AppError/AppError';
import { ErrorDictionary } from '@shared/Util/ErrorDictionary';
import { ZODVerifyParse } from '@shared/Util/ZOD/zod';

import { CampaignCreateSchema } from './CampaignCreate.Schema';
import { ICampaignCreateDTO } from './DTO/ICampaignCreateDTO';

@injectable()
export class CampaignCreateUseCase {
  constructor(
    @inject('RepositoryUsers') private RepositoryUsers: IRepositoryUsers,
    @inject('RepositoryCampaigns') private RepositoryCampaigns: IRepositoryCampaigns,
  ) {}

  async execute(request: ICampaignCreateDTO.Params) {
    const { token, devices, domain, name, origin, countries, languages, manualReview, offerPage, safePage } = ZODVerifyParse({
      schema: CampaignCreateSchema,
      data: request,
    });

    const { data: dataUser } = await this.RepositoryUsers.FindUserById({ id: token.id });
    if (!dataUser) throw new AppError(ErrorDictionary.USER.dataNotFound.message, 401, ErrorDictionary.USER.dataNotFound.codeIntern);

    const id = handleGenerateUuid();
    await this.RepositoryCampaigns.Create({
      id,
      name,
      domain,
      origin,
      devices,
      safePage,
      countries,
      languages,
      offerPage,
      manualReview,
      userId: token.id,
    });

    const returnResponse = {
      id,
      ...ErrorDictionary.CAMPAIGN.campaignCreatedSuccessfully,
    };

    return returnResponse;
  }
}
