import { container } from 'tsyringe';

import { DashboardCampaignMetricController } from './DashboardCampaignMetric.Controller';
import { DashboardCampaignMetricUseCase } from './DashboardCampaignMetric.UseCase';

export const DashboardCampaignMetricControllerIndex = new DashboardCampaignMetricController(container.resolve(DashboardCampaignMetricUseCase));
