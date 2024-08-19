import { $Enums, Campaign } from '@prisma/client';

export namespace ICreateDTO {
  export type Params = {
    id: string;
    origin: string[];
    name: string;
    domain: string;
    safePage?: string;
    offerPage?: string;
    languages?: string[];
    countries?: string[];
    devices: $Enums.CampaignDevices[];
    domainStatus?: $Enums.domainStatus;
    manualReview?: boolean;
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
    antiSpy?: $Enums.CampaignAntiSpy[];
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
    origin?: string[];
    name?: string;
    domain?: string;
    safePage?: string;
    offerPage?: string;
    languages?: string[];
    countries?: string[];
    devices?: $Enums.CampaignDevices[];
    domainStatus?: $Enums.domainStatus;
    manualReview?: boolean;
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

export interface IRepositoryCampaigns {
  Create(data: ICreateDTO.Params): Promise<void>;
  FindDomain(data: IFindDomainDTO.Params): Promise<IFindDomainDTO.Result>;
  FindById(data: IFindByIdDTO.Params): Promise<IFindByIdDTO.Result>;
  GetById(data: IGetByIdDTO.Params): Promise<IGetByIdDTO.Result>;
  UpdateAllowConfig(data: IUpdateAllowConfigDTO.Params): Promise<void>;
  UpdateDenyConfig(data: IUpdateDenyConfigDTO.Params): Promise<void>;
  Update(data: IUpdateDTO.Params): Promise<void>;
  Delete(data: IDeleteDTO.Params): Promise<void>;
  Get(data: IGetDTO.Params): Promise<IGetDTO.Result>;
}
