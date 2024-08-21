import { z } from 'zod';

import { UserCreateSchema } from '../UserCreate.Schema';

export type UserCreateSchemaZod = z.output<typeof UserCreateSchema>;

export namespace IUserCreateDTO {
  export type Params = UserCreateSchemaZod;

  export type Result = {};
}
