import { IRepositoryCampaign } from 'Repositories/Campaign/IRepositoryCampaign';
import { IRepositoryUser } from 'Repositories/User/IRepositoryUser';
import { inject, injectable } from 'tsyringe';

import { handleCreateSlug } from '@shared/features/createSlug/handleCreateSlug';
import { handleGenerateUuid } from '@shared/features/handleGenerateUuid/handleGenerateUuid';
import { AppError } from '@shared/Util/AppError/AppError';
import { ErrorDictionary } from '@shared/Util/ErrorDictionary';
import { ZODVerifyParse } from '@shared/Util/ZOD/zod';

import { CampaignCreateSchema } from './CampaignCreate.Schema';
import { ICampaignCreateDTO } from './DTO/ICampaignCreateDTO';

@injectable()
export class CampaignCreateUseCase {
  constructor(
    @inject('RepositoryUser') private RepositoryUser: IRepositoryUser,
    @inject('RepositoryCampaign') private RepositoryCampaign: IRepositoryCampaign,
  ) {}

  async execute(request: ICampaignCreateDTO.Params) {
    const data = ZODVerifyParse({
      schema: CampaignCreateSchema,
      data: request,
    });

    const { data: dataUser } = await this.RepositoryUser.GetById({ id: data.token.id });
    if (!dataUser) throw new AppError(ErrorDictionary.USER.dataNotFound, 401);

    const id = handleGenerateUuid();
    await this.RepositoryCampaign.Create({
      id,
      vat: data.vat,
      name: data.name,
      domain: data.domain,
      origin: data.origin,
      devices: data.devices,
      address: data.address,
      userId: data.token.id,
      pageType: data.pageType,
      slug: handleCreateSlug(),
      safePage: data.safePage,
      countries: data.countries,
      languages: data.languages,
      offerPage: data.offerPage,
      disclaimer: data.disclaimer,
      companyName: data.companyName,
      supportEmail: data.supportEmail,
      manualReview: data.manualReview,
      supportPhone: data.supportPhone,
      googleSources: data.googleSources,
      safePageMethod: data.safePageMethod,
      offerPageMethod: data.offerPageMethod,
    });

    const returnResponse = {
      id,
      ...ErrorDictionary.CAMPAIGN.campaignCreatedSuccessfully,
    };

    return returnResponse;
  }
}
