import { z } from 'zod';

import { AuthLoginSchema } from '../AuthLogin.Schema';

export type AuthLoginSchemaZod = z.output<typeof AuthLoginSchema>;

export namespace IAuthLoginDTO {
  export type Params = AuthLoginSchemaZod;

  export type Result = {};
}
