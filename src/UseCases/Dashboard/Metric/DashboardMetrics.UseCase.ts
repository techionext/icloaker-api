import { IRepositoryDashboard } from 'Repositories/Dashboard/IRepositoryDashboard';
import { IRepositoryUser } from 'Repositories/User/IRepositoryUser';
import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/Util/Errors/AppError';
import { ErrorDictionary } from '@shared/Util/ErrorDictionary';
import { ZODVerifyParse } from '@shared/Util/ZOD/zod';

import { DashboardMetricsSchema } from './DashboardMetrics.Schema';
import { IDashboardMetricsDTO } from './DTO/IDashboardMetricsDTO';

@injectable()
export class DashboardMetricsUseCase {
  constructor(
    @inject('RepositoryUser') private RepositoryUser: IRepositoryUser,
    @inject('RepositoryDashboard') private RepositoryDashboard: IRepositoryDashboard,
  ) {}

  async execute(request: IDashboardMetricsDTO.Params) {
    const { token, endDate, startDate } = ZODVerifyParse({
      schema: DashboardMetricsSchema,
      data: request,
    });

    const { data: dataUser } = await this.RepositoryUser.GetById({ id: token.id });
    if (!dataUser) throw new AppError(ErrorDictionary.USER.dataNotFound, 401);

    const { data } = await this.RepositoryDashboard.Metrics({ endDate, startDate, userId: dataUser.id });

    const dayInfos = data.reduce((acc, item) => {
      const date = item.createdAt.toISOString().split('T')[0];

      if (!acc[date]) {
        acc[date] = {
          bots: 0,
          safePage: 0,
          offerPage: 0,
          totalRequests: 0,
        };
      }

      acc[date].bots = item.ipInfo?.bot_info.is_bot === true ? acc[date].bots + 1 : acc[date].bots;

      acc[date].safePage = item.redirectTo !== null && item.campaign.safePage === item.redirectTo ? acc[date].safePage + 1 : acc[date].safePage;

      acc[date].offerPage =
        item.redirectTo !== null && item.campaign.offerPage.includes(item.redirectTo) ? acc[date].offerPage + 1 : acc[date].offerPage;

      acc[date].totalRequests = acc[date].totalRequests + 1;

      return acc;
    }, {} as Record<string, { bots: number; safePage: number; offerPage: number; totalRequests: number }>);

    const rangeInfos = Object.values(dayInfos).reduce(
      (acc, day) => {
        acc.bots += day.bots;
        acc.safePage += day.safePage;
        acc.offerPage += day.offerPage;
        acc.totalRequests += day.totalRequests;
        return acc;
      },
      { bots: 0, safePage: 0, offerPage: 0, totalRequests: 0 },
    );

    const returnResponse = {
      data: {
        days: dayInfos,
        range: rangeInfos,
      },
    };

    return returnResponse;
  }
}
