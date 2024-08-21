import { z } from 'zod';

import { UserGetByIdSchema } from '../UserGetById.Schema';

export type UserGetByIdSchemaZod = z.output<typeof UserGetByIdSchema>;

export namespace IUserGetByIdDTO {
  export type Params = UserGetByIdSchemaZod;

  export type Result = {};
}
