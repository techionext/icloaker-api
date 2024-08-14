import { z } from 'zod';

import { GetCollaboratorsSchema } from '../GetCollaborators.Schema';

export type GetCollaboratorsSchemaZod = z.output<typeof GetCollaboratorsSchema>;

export namespace IGetCollaboratorsDTO {
  export type Params = GetCollaboratorsSchemaZod;

  export type Result = {};
}
