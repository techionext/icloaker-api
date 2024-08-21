import { z } from 'zod';

import { CampaignDenyConfigSchema } from '../CampaignDenyConfig.Schema';

export type CampaignDenyConfigSchemaZod = z.output<typeof CampaignDenyConfigSchema>;

export namespace ICampaignDenyConfigDTO {
  export type Params = CampaignDenyConfigSchemaZod;

  export type Result = {};
}
