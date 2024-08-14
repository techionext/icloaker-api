import { z } from 'zod';

import { CreateUserSchema } from '../CreateUser.Schema';

export type CreateUserSchemaZod = z.output<typeof CreateUserSchema>;

export namespace ICreateUserDTO {
  export type Params = CreateUserSchemaZod;

  export type Result = {};
}
