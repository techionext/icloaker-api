import { z } from 'zod';

import { UpdateCollaboratorSchema } from '../UpdateCollaborator.Schema';

export type UpdateCollaboratorSchemaZod = z.output<typeof UpdateCollaboratorSchema>;

export namespace IUpdateCollaboratorDTO {
  export type Params = UpdateCollaboratorSchemaZod;

  export type Result = {};
}
