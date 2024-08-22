import { container } from 'tsyringe';

import { DashboardMetricsController } from './DashboardMetrics.Controller';
import { DashboardMetricsUseCase } from './DashboardMetrics.UseCase';

export const DashboardMetricsControllerIndex = new DashboardMetricsController(container.resolve(DashboardMetricsUseCase));
