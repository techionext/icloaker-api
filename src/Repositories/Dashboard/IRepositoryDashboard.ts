import { IpInfo } from '@shared/models/IpInfo';
import { RequestInfo } from '@shared/models/RequestInfo';

export namespace IMetricsDTO {
  export type Params = {
    startDate: string;
    endDate: string;
    userId: string;
  };

  export type Result = {
    data: {
      ipInfo: IpInfo;
      redirectTo: string | null;
      createdAt: Date;
      campaign: {
        safePage: string | null;
        offerPage: string[];
      };
    }[];
  };
}

export namespace ICampaignMetricsDTO {
  export type Params = {
    startDate: string;
    endDate: string;
    userId: string;
    campaignId: string;
  };

  export type Result = {
    data: {
      ipInfo: IpInfo;
      requestInfo: RequestInfo;
      redirectTo: string | null;
      createdAt: Date;
      campaign: {
        safePage: string | null;
        offerPage: string[];
      };
    }[];
  };
}

export namespace ICampaignMetricsCountryDTO {
  export type Params = {
    startDate: string;
    endDate: string;
    userId: string;
    campaignId: string;
    countryCode: string;
  };

  export type Result = {
    data: {
      ipInfo: IpInfo;
      requestInfo: RequestInfo;
      redirectTo: string | null;
      createdAt: Date;
      campaign: {
        safePage: string | null;
        offerPage: string[];
      };
    }[];
  };
}

export interface IRepositoryDashboard {
  Metrics(data: IMetricsDTO.Params): Promise<IMetricsDTO.Result>;
  CampaignMetrics(data: ICampaignMetricsDTO.Params): Promise<ICampaignMetricsDTO.Result>;
  CampaignMetricsCountry(data: ICampaignMetricsCountryDTO.Params): Promise<ICampaignMetricsCountryDTO.Result>;
}
