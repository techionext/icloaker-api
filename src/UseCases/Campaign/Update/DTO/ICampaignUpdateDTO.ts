import { z } from 'zod';

import { CampaignUpdateSchema } from '../CampaignUpdate.Schema';

export type CampaignUpdateSchemaZod = z.output<typeof CampaignUpdateSchema>;

export namespace ICampaignUpdateDTO {
  export type Params = CampaignUpdateSchemaZod;

  export type Result = {};
}
