import { z } from 'zod';

import { CampaignGetSchema } from '../CampaignGet.Schema';

export type CampaignGetSchemaZod = z.output<typeof CampaignGetSchema>;

export namespace ICampaignGetDTO {
  export type Params = CampaignGetSchemaZod;

  export type Result = {};
}
