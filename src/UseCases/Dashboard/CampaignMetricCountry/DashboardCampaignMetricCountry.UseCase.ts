import { IRepositoryDashboard } from 'Repositories/Dashboard/IRepositoryDashboard';
import { IRepositoryUser } from 'Repositories/User/IRepositoryUser';
import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/Util/AppError/AppError';
import { ErrorDictionary } from '@shared/Util/ErrorDictionary';
import { ZODVerifyParse } from '@shared/Util/ZOD/zod';

import { handleDetectBrowserName } from '../CampaignMetric/features/DetectBrowserName';
import { DashboardCampaignMetricCountrySchema } from './DashboardCampaignMetricCountry.Schema';
import { IDashboardCampaignMetricCountryDTO } from './DTO/IDashboardCampaignMetricCountryDTO';
import { ICampaignMetricCountry } from './feature/CampaignMetricCountryType';

@injectable()
export class DashboardCampaignMetricCountryUseCase {
  constructor(
    @inject('RepositoryUser') private RepositoryUser: IRepositoryUser,
    @inject('RepositoryDashboard') private RepositoryDashboard: IRepositoryDashboard,
  ) {}

  async execute(request: IDashboardCampaignMetricCountryDTO.Params) {
    const { token, campaignId, countryCode, endDate, startDate } = ZODVerifyParse({
      schema: DashboardCampaignMetricCountrySchema,
      data: request,
    });

    const { data: dataUser } = await this.RepositoryUser.GetById({ id: token.id });
    if (!dataUser) throw new AppError(ErrorDictionary.USER.dataNotFound, 401);

    const { data } = await this.RepositoryDashboard.CampaignMetricsCountry({ campaignId, countryCode, endDate, startDate, userId: dataUser.id });

    const refinedData = data.reduce(
      (acc, item) => {
        const currentDeniedAccess = item.redirectTo !== null && item.campaign.safePage === item.redirectTo;
        const currentAllowedAccess = item.redirectTo !== null && item.campaign.offerPage.includes(item.redirectTo);
        const currentDeviceType = item.requestInfo?.device.type;
        const currentBrowserName = handleDetectBrowserName(item.requestInfo?.userAgent);
        const currentRegionCode = item.ipInfo?.location.region_code;

        acc.allRegions.totalAccesses++;

        if (currentAllowedAccess) {
          acc.allRegions.allowedAccesses++;
        }

        if (currentDeniedAccess) {
          acc.allRegions.deniedAccesses++;
        }

        if (currentDeviceType) {
          if (!acc.allRegions.devices[currentDeviceType]) {
            acc.allRegions.devices[currentDeviceType] = 0;
          }

          acc.allRegions.devices[currentDeviceType]++;
        }

        if (currentBrowserName) {
          if (!acc.allRegions.browsers[currentBrowserName]) {
            acc.allRegions.browsers[currentBrowserName] = 0;
          }
          acc.allRegions.browsers[currentBrowserName]++;
        }

        if (currentRegionCode !== null && currentRegionCode !== undefined && !acc[currentRegionCode]) {
          acc[currentRegionCode] = {
            allowedAccesses: 0,
            deniedAccesses: 0,
            totalAccesses: 0,
            browsers: {},
            devices: { ANDROID: 0, IPHONE: 0, LINUX: 0, MACBOOK: 0, WINDOWS: 0, UNKNOWN: 0 },
          };
        }

        if (currentRegionCode !== null && currentRegionCode !== undefined) {
          acc[currentRegionCode].totalAccesses++;

          if (currentDeviceType) {
            acc[currentRegionCode].devices[currentDeviceType]++;
          }

          if (currentBrowserName) {
            if (!acc[currentRegionCode].browsers[currentBrowserName]) {
              acc[currentRegionCode].browsers[currentBrowserName] = 0;
            }

            acc[currentRegionCode].browsers[currentBrowserName]++;
          }

          if (currentDeniedAccess) {
            acc[currentRegionCode].deniedAccesses++;
          }

          if (currentAllowedAccess) {
            acc[currentRegionCode].allowedAccesses++;
          }
        }

        return acc;
      },
      { allRegions: { allowedAccesses: 0, browsers: {}, deniedAccesses: 0, devices: {}, totalAccesses: 0 } } as ICampaignMetricCountry,
    );

    const returnResponse = { data: refinedData };

    return returnResponse;
  }
}
