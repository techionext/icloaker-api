import { Router } from 'express';

import { DashboardCampaignMetricControllerIndex } from 'UseCases/Dashboard/CampaignMetric';
import { DashboardCampaignMetricCountryControllerIndex } from 'UseCases/Dashboard/CampaignMetricCountry';
import { DashboardMetricsControllerIndex } from 'UseCases/Dashboard/Metric';

export const routerDashboard = Router();

routerDashboard.get('/metrics', (req, res) => DashboardMetricsControllerIndex.handle(req, res));
routerDashboard.get('/:campaignId', (req, res) => DashboardCampaignMetricControllerIndex.handle(req, res));
routerDashboard.get('/country/:campaignId', (req, res) => DashboardCampaignMetricCountryControllerIndex.handle(req, res));
