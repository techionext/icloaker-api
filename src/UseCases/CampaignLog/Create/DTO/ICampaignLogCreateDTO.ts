import { z } from 'zod';

import { CampaignLogCreateSchema } from '../CampaignLogCreate.Schema';

export type CampaignLogCreateSchemaZod = z.output<typeof CampaignLogCreateSchema>;

export namespace ICampaignLogCreateDTO {
  export type Params = CampaignLogCreateSchemaZod;

  export type Result = {};
}
