import { z } from 'zod';

import { CampaignDeleteSchema } from '../CampaignDelete.Schema';

export type CampaignDeleteSchemaZod = z.output<typeof CampaignDeleteSchema>;

export namespace ICampaignDeleteDTO {
  export type Params = CampaignDeleteSchemaZod;

  export type Result = {};
}
