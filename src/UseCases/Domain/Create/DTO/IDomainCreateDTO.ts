import { z } from 'zod';

import { DomainCreateSchema } from '../DomainCreate.Schema';

export type DomainCreateSchemaZod = z.output<typeof DomainCreateSchema>;

export namespace IDomainCreateDTO {
  export type Params = DomainCreateSchemaZod;

  export type Result = {};
}
