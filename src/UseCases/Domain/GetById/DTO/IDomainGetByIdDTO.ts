import { z } from 'zod';

import { DomainGetByIdSchema } from '../DomainGetById.Schema';

export type DomainGetByIdSchemaZod = z.output<typeof DomainGetByIdSchema>;

export namespace IDomainGetByIdDTO {
  export type Params = DomainGetByIdSchemaZod;

  export type Result = {};
}
