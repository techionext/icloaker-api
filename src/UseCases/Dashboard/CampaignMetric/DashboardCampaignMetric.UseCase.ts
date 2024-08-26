import { IRepositoryDashboard } from 'Repositories/Dashboard/IRepositoryDashboard';
import { IRepositoryUser } from 'Repositories/User/IRepositoryUser';
import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/Util/Errors/AppError';
import { ErrorDictionary } from '@shared/Util/ErrorDictionary';
import { ZODVerifyParse } from '@shared/Util/ZOD/zod';

import { DashboardCampaignMetricSchema } from './DashboardCampaignMetric.Schema';
import { IDashboardCampaignMetricDTO } from './DTO/IDashboardCampaignMetricDTO';
import { ICampaignMetric } from './features/CampaignMetricType';
import { handleDetectBrowserName } from './features/DetectBrowserName';

@injectable()
export class DashboardCampaignMetricUseCase {
  constructor(
    @inject('RepositoryUser') private RepositoryUser: IRepositoryUser,
    @inject('RepositoryDashboard') private RepositoryDashboard: IRepositoryDashboard,
  ) {}

  async execute(request: IDashboardCampaignMetricDTO.Params) {
    const { token, endDate, startDate, campaignId } = ZODVerifyParse({
      schema: DashboardCampaignMetricSchema,
      data: request,
    });

    const { data: dataUser } = await this.RepositoryUser.GetById({ id: token.id });
    if (!dataUser) throw new AppError(ErrorDictionary.USER.dataNotFound, 401);
    const { data } = await this.RepositoryDashboard.CampaignMetrics({ campaignId, endDate, startDate, userId: dataUser.id });

    const refinedData = data.reduce(
      (acc, item) => {
        const date = item.createdAt.toISOString().split('T')[0];
        const currentDeniedAccess = item.redirectTo !== null && item.campaign.safePage === item.redirectTo;
        const currentAllowedAccess = item.redirectTo !== null && item.campaign.offerPage.includes(item.redirectTo);
        const currentIsBot = item.ipInfo?.bot_info.is_bot === true;
        const currentDeviceType = item.requestInfo?.device.type;
        const currentBrowserName = handleDetectBrowserName(item.requestInfo?.userAgent);
        const currentCountryCode = item.ipInfo?.location.country_code;

        if (!acc.recent[date]) {
          acc.recent[date] = {
            bots: 0,
            safePage: 0,
            offerPage: 0,
            totalRequests: 0,
          };
        }

        acc.totalAccesses++;
        acc.recent[date].totalRequests++;

        if (currentDeviceType) {
          if (!acc.devices[currentDeviceType]) {
            acc.devices[currentDeviceType] = 0;
          }

          acc.devices[currentDeviceType]++;
        }

        if (currentBrowserName) {
          if (!acc.browsers[currentBrowserName]) {
            acc.browsers[currentBrowserName] = 0;
          }
          acc.browsers[currentBrowserName]++;
        }

        if (currentDeniedAccess) {
          acc.deniedAccesses++;
          acc.recent[date].safePage++;
        }

        if (currentAllowedAccess) {
          acc.allowedAccesses++;
          acc.recent[date].offerPage++;
        }

        if (currentIsBot) {
          acc.recent[date].bots++;
        }

        if (currentCountryCode) {
          if (!acc.countries[currentCountryCode]) {
            acc.countries[currentCountryCode] = {
              allowedAccesses: 0,
              deniedAccesses: 0,
              totalAccesses: 0,
              browsers: {},
              devices: {
                ANDROID: 0,
                IPHONE: 0,
                LINUX: 0,
                MACBOOK: 0,
                WINDOWS: 0,
                UNKNOWN: 0,
              },
            };
          }

          acc.countries[currentCountryCode].totalAccesses++;

          if (currentDeviceType) {
            acc.countries[currentCountryCode].devices[currentDeviceType]++;
          }

          if (currentBrowserName) {
            if (!acc.countries[currentCountryCode].browsers[currentBrowserName]) {
              acc.countries[currentCountryCode].browsers[currentBrowserName] = 0;
            }

            acc.countries[currentCountryCode].browsers[currentBrowserName]++;
          }

          if (currentDeniedAccess) {
            acc.countries[currentCountryCode].deniedAccesses++;
          }

          if (currentAllowedAccess) {
            acc.countries[currentCountryCode].allowedAccesses++;
          }
        }

        return acc;
      },
      {
        totalAccesses: 0,
        deniedAccesses: 0,
        allowedAccesses: 0,
        devices: {
          ANDROID: 0,
          IPHONE: 0,
          LINUX: 0,
          MACBOOK: 0,
          WINDOWS: 0,
          UNKNOWN: 0,
        },
        browsers: {},
        recent: {},
        countries: {},
      } as ICampaignMetric,
    );

    const returnResponse = { data: refinedData };

    return returnResponse;
  }
}
