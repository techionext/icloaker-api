import { z } from 'zod';

import { DeleteCollaboratorSchema } from '../DeleteCollaborator.Schema';

export type DeleteCollaboratorSchemaZod = z.output<typeof DeleteCollaboratorSchema>;

export namespace IDeleteCollaboratorDTO {
  export type Params = DeleteCollaboratorSchemaZod;

  export type Result = {};
}

