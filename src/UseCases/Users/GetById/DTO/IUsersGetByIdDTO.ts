import { z } from 'zod';

import { UsersGetByIdSchema } from '../UsersGetById.Schema';

export type UsersGetByIdSchemaZod = z.output<typeof UsersGetByIdSchema>;

export namespace IUsersGetByIdDTO {
  export type Params = UsersGetByIdSchemaZod;

  export type Result = {};
}
