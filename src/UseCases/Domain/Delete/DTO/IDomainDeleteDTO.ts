import { z } from 'zod';

import { DomainDeleteSchema } from '../DomainDelete.Schema';

export type DomainDeleteSchemaZod = z.output<typeof DomainDeleteSchema>;

export namespace IDomainDeleteDTO {
  export type Params = DomainDeleteSchemaZod;

  export type Result = {};
}
