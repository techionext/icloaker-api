import { z } from 'zod';

import { UserUpdateSchema } from '../UserUpdate.Schema';

export type UserUpdateSchemaZod = z.output<typeof UserUpdateSchema>;

export namespace IUserUpdateDTO {
  export type Params = UserUpdateSchemaZod;

  export type Result = {};
}
