import { z } from 'zod';

import { CollaboratorDeleteSchema } from '../CollaboratorDelete.Schema';

export type CollaboratorDeleteSchemaZod = z.output<typeof CollaboratorDeleteSchema>;

export namespace ICollaboratorDeleteDTO {
  export type Params = CollaboratorDeleteSchemaZod;

  export type Result = {};
}
