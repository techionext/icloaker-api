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
    const data = ZODVerifyParse({
      schema: CampaignUpdateSchema,
      data: request,
    });

    const { data: dataUser } = await this.RepositoryUser.GetById({ id: data.token.id });
    if (!dataUser) throw new AppError(ErrorDictionary.USER.dataNotFound, 401);

    const { isExists: isExistsCampaign } = await this.RepositoryCampaign.GetById({ id: data.id, userId: dataUser.id });
    if (!isExistsCampaign) throw new AppError(ErrorDictionary.CAMPAIGN.campaignNotFoundWithId, 400);

    await this.RepositoryCampaign.Update({
      id: data.id,
      origin: data.origin,
      googleSources: data.googleSources,
      name: data.name,
      domain: data.domain,
      safePage: data.safePage,
      safePageMethod: data.safePageMethod,
      offerPage: data.offerPage,
      offerPageMethod: data.offerPageMethod,
      languages: data.languages,
      countries: data.countries,
      devices: data.devices,
      manualReview: data.manualReview,
      pageType: data.pageType,
      disclaimer: data.disclaimer,
      companyName: data.companyName,
      address: data.address,
      vat: data.vat,
      supportPhone: data.supportPhone,
      supportEmail: data.supportEmail,
    });

    const returnResponse = {
      ...ErrorDictionary.CAMPAIGN.campaignUpdatedSuccessfully,
    };

    return returnResponse;
  }
}
