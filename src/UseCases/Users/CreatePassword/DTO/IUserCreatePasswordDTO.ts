import { z } from 'zod';

import { UserCreatePasswordSchema } from '../UserCreatePassword.Schema';

export type UserCreatePasswordSchemaZod = z.output<typeof UserCreatePasswordSchema>;

export namespace IUserCreatePasswordDTO {
  export type Params = UserCreatePasswordSchemaZod;

  export type Result = {};
}
