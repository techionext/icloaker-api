import { z } from 'zod';

import { DomainUpdateSchema } from '../DomainUpdate.Schema';

export type DomainUpdateSchemaZod = z.output<typeof DomainUpdateSchema>;

export namespace IDomainUpdateDTO {
  export type Params = DomainUpdateSchemaZod;

  export type Result = {};
}
