import { z } from 'zod';

import { AuthSessionSchema } from '../AuthSession.Schema';

export type AuthSessionSchemaZod = z.output<typeof AuthSessionSchema>;

export namespace IAuthSessionDTO {
  export type Params = AuthSessionSchemaZod;

  export type Result = {};
}
