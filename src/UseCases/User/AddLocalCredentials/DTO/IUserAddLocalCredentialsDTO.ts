import { z } from 'zod';

import { UserAddLocalCredentialsSchema } from '../UserAddLocalCredentials.Schema';

export type UserAddLocalCredentialsSchemaZod = z.output<typeof UserAddLocalCredentialsSchema>;

export namespace IUserAddLocalCredentialsDTO {
  export type Params = UserAddLocalCredentialsSchemaZod;

  export type Result = {};
}
