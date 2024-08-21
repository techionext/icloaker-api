import { z } from 'zod';

import { UserRequestPasswordChangeSchema } from '../UserRequestPasswordChange.Schema';

export type UserRequestPasswordChangeSchemaZod = z.output<typeof UserRequestPasswordChangeSchema>;

export namespace IUserRequestPasswordChangeDTO {
  export type Params = UserRequestPasswordChangeSchemaZod;

  export type Result = {};
}
