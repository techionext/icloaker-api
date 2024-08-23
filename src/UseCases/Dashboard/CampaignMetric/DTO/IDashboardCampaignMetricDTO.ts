import { z } from 'zod';

import { DashboardCampaignMetricSchema } from '../DashboardCampaignMetric.Schema';

export type DashboardCampaignMetricSchemaZod = z.output<typeof DashboardCampaignMetricSchema>;

export namespace IDashboardCampaignMetricDTO {
  export type Params = DashboardCampaignMetricSchemaZod;

  export type Result = {};
}
