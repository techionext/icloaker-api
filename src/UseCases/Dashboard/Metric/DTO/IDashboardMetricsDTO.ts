import { z } from 'zod';

import { DashboardMetricsSchema } from '../DashboardMetrics.Schema';

export type DashboardMetricsSchemaZod = z.output<typeof DashboardMetricsSchema>;

export namespace IDashboardMetricsDTO {
  export type Params = DashboardMetricsSchemaZod;

  export type Result = {};
}
