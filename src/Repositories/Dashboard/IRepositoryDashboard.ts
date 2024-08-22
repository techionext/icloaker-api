import { IpInfo } from '@shared/models/IpInfo';

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

export interface IRepositoryDashboard {
  Metrics(data: IMetricsDTO.Params): Promise<IMetricsDTO.Result>;
}
