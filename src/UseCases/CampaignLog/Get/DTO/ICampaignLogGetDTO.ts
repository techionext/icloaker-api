import { z } from 'zod';

import { CampaignLogGetSchema } from '../CampaignLogGet.Schema';

export type CampaignLogGetSchemaZod = z.output<typeof CampaignLogGetSchema>;

export namespace ICampaignLogGetDTO {
  export type Params = CampaignLogGetSchemaZod;

  export type Result = {};
}
