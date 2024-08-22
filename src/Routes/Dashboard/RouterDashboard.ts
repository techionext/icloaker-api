import { Router } from 'express';

import { DashboardMetricsControllerIndex } from 'UseCases/Dashboard/Metric';

export const routerDashboard = Router();

routerDashboard.get('/metrics', (req, res) => DashboardMetricsControllerIndex.handle(req, res));
