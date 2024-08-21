import { z } from 'zod';

import { CampaignCreateSchema } from '../CampaignCreate.Schema';

export type CampaignCreateSchemaZod = z.output<typeof CampaignCreateSchema>;

export namespace ICampaignCreateDTO {
  export type Params = CampaignCreateSchemaZod;

  export type Result = {};
}
