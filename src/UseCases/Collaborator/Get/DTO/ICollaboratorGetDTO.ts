import { z } from 'zod';

import { CollaboratorGetSchema } from '../CollaboratorGet.Schema';

export type CollaboratorGetSchemaZod = z.output<typeof CollaboratorGetSchema>;

export namespace ICollaboratorGetDTO {
  export type Params = CollaboratorGetSchemaZod;

  export type Result = {};
}
