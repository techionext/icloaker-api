import { z } from 'zod';

import { CreateCollaboratorSchema } from '../CreateCollaborator.Schema';

export type CreateCollaboratorSchemaZod = z.output<typeof CreateCollaboratorSchema>;

export namespace ICreateCollaboratorDTO {
  export type Params = CreateCollaboratorSchemaZod;

  export type Result = {};
}
