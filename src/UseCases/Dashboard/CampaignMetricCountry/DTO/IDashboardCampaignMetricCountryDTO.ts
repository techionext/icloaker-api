import { z } from 'zod';

import { DashboardCampaignMetricCountrySchema } from '../DashboardCampaignMetricCountry.Schema';

export type DashboardCampaignMetricCountrySchemaZod = z.output<typeof DashboardCampaignMetricCountrySchema>;

export namespace IDashboardCampaignMetricCountryDTO {
  export type Params = DashboardCampaignMetricCountrySchemaZod;

  export type Result = {};
}
