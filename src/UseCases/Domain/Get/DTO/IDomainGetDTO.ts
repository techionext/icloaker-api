import { z } from 'zod';

import { DomainGetSchema } from '../DomainGet.Schema';

export type DomainGetSchemaZod = z.output<typeof DomainGetSchema>;

export namespace IDomainGetDTO {
  export type Params = DomainGetSchemaZod;

  export type Result = {};
}
