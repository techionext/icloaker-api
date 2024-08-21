import { z } from 'zod';

import { CollaboratorCreateSchema } from '../CollaboratorCreate.Schema';

export type CollaboratorCreateSchemaZod = z.output<typeof CollaboratorCreateSchema>;

export namespace ICollaboratorCreateDTO {
  export type Params = CollaboratorCreateSchemaZod;

  export type Result = {};
}
