import { CampaignLog } from '@prisma/client';

export namespace ICreateDTO {
  export type Params = {
    campaignId: string;
    apiResponse?: string;
    deviceInfo?: string;
    ip?: string;
    ipInfo?: string;
    language?: string;
    page?: string;
    redirectTo?: string;
    referer?: string;
    userAgent?: string;
  };
}

export namespace IGetDTO {
  export type Params = {
    campaignId: string;
    page: number;
    pageSize: number;
  };

  export type Result = {
    data: CampaignLog[];
    meta: {
      page: number;
      pageSize: number;
      total: number;
      totalPages: number;
    };
  };
}

export interface IRepositoryCampaignLogs {
  Create(data: ICreateDTO.Params): Promise<void>;
  Get(data: IGetDTO.Params): Promise<IGetDTO.Result>;
}
