import { z } from 'zod';

import { CampaignAllowConfigSchema } from '../CampaignAllowConfig.Schema';

export type CampaignAllowConfigSchemaZod = z.output<typeof CampaignAllowConfigSchema>;

export namespace ICampaignAllowConfigDTO {
  export type Params = CampaignAllowConfigSchemaZod;

  export type Result = {};
}
