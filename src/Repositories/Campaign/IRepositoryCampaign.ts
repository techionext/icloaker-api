import { $Enums, Campaign } from '@prisma/client';

export namespace ICreateDTO {
  export type Params = {
    id: string;
    slug: string;
    origin: $Enums.origins[];
    googleSources?: $Enums.googleTrafficSource[];
    name: string;
    domain: string;
    safePage?: string;
    safePageMethod: $Enums.safePageMethods;
    offerPage: string[];
    offerPageMethod: $Enums.offerPageMethods;
    languages?: string[];
    countries?: string[];
    devices: $Enums.campaignDevices[];
    domainStatus?: $Enums.domainStatus;
    manualReview?: boolean;
    pageType: $Enums.pageTypes;
    disclaimer: string;
    companyName: string;
    address: string;
    vat: string;
    supportPhone: string;
    supportEmail: string;
    logo?: string;
    userId: string;
  };
}
export namespace IFindDomainDTO {
  export type Params = {
    domain: string;
  };

  export type Result = {
    isExists: boolean;
  };
}
export namespace IFindByIdDTO {
  export type Params = {
    id: string;
    userId?: string;
  };

  export type Result = {
    isExists: boolean;
  };
}
export namespace IGetByIdDTO {
  export type Params = {
    id: string;
    userId?: string;
  };

  export type Result = {
    data: Campaign | null;
    isExists: boolean;
  };
}
export namespace IUpdateAllowConfigDTO {
  export type Params = {
    id: string;
    allowIsps?: string[];
    allowRefererOrigins?: string[];
    allowQueries?: string[];
    allowIps?: string[];
  };
}
export namespace IUpdateDenyConfigDTO {
  export type Params = {
    id: string;
    antiSpy?: $Enums.campaignAntiSpy[];
    denyLanguages?: string[];
    denyCountries?: string[];
    denyIps?: string[];
    denyIsps?: string[];
    denyQueries?: string[];
    denyRefererOrigins?: string[];
  };
}
export namespace IUpdateDTO {
  export type Params = {
    id: string;
    vat?: string;
    name?: string;
    domain?: string;
    address?: string;
    safePage?: string;
    pageType?: $Enums.pageTypes;
    disclaimer?: string;
    companyName?: string;
    supportPhone?: string;
    supportEmail?: string;
    manualReview?: boolean;
    origin?: $Enums.origins[];
    languages?: string[];
    countries?: string[];
    devices?: $Enums.campaignDevices[];
    domainStatus?: $Enums.domainStatus;
    googleSources?: $Enums.googleTrafficSource[];
    safePageMethod?: $Enums.safePageMethods;
    offerPage?: string[];
    offerPageMethod?: $Enums.offerPageMethods;
  };
}
export namespace IDeleteDTO {
  export type Params = {
    id: string;
  };
}
export namespace IGetDTO {
  export type Params = {
    page: number;
    pageSize: number;
    filter?: string;
    userId?: string;
  };
  export type Result = {
    data: Campaign[];
    meta: {
      page: number;
      pageSize: number;
      total: number;
      totalPages: number;
    };
  };
}

export interface IRepositoryCampaign {
  FindDomain(data: IFindDomainDTO.Params): Promise<IFindDomainDTO.Result>;
  FindById(data: IFindByIdDTO.Params): Promise<IFindByIdDTO.Result>;
  GetById(data: IGetByIdDTO.Params): Promise<IGetByIdDTO.Result>;
  Get(data: IGetDTO.Params): Promise<IGetDTO.Result>;

  UpdateAllowConfig(data: IUpdateAllowConfigDTO.Params): Promise<void>;
  UpdateDenyConfig(data: IUpdateDenyConfigDTO.Params): Promise<void>;
  Create(data: ICreateDTO.Params): Promise<void>;
  Update(data: IUpdateDTO.Params): Promise<void>;
  Delete(data: IDeleteDTO.Params): Promise<void>;
}
