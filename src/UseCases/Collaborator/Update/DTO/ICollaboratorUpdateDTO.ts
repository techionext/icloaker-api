import { z } from 'zod';

import { CollaboratorUpdateSchema } from '../CollaboratorUpdate.Schema';

export type CollaboratorUpdateSchemaZod = z.output<typeof CollaboratorUpdateSchema>;

export namespace ICollaboratorUpdateDTO {
  export type Params = CollaboratorUpdateSchemaZod;

  export type Result = {};
}
