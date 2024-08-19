import { z } from 'zod';

import { CampaignGetByIdSchema } from '../CampaignGetById.Schema';

export type CampaignGetByIdSchemaZod = z.output<typeof CampaignGetByIdSchema>;

export namespace ICampaignGetByIdDTO {
  export type Params = CampaignGetByIdSchemaZod;

  export type Result = {};
}
