import { container } from 'tsyringe';

import { DashboardCampaignMetricCountryController } from './DashboardCampaignMetricCountry.Controller';
import { DashboardCampaignMetricCountryUseCase } from './DashboardCampaignMetricCountry.UseCase';

export const DashboardCampaignMetricCountryControllerIndex = new DashboardCampaignMetricCountryController(
  container.resolve(DashboardCampaignMetricCountryUseCase),
);
