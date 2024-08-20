import { z } from 'zod';

import { UsersUpdateSchema } from '../UsersUpdate.Schema';

export type UsersUpdateSchemaZod = z.output<typeof UsersUpdateSchema>;

export namespace IUsersUpdateDTO {
  export type Params = UsersUpdateSchemaZod;

  export type Result = {};
}
