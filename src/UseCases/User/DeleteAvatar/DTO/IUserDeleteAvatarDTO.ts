import { z } from 'zod';

import { UserDeleteAvatarSchema } from '../UserDeleteAvatar.Schema';

export type UserDeleteAvatarSchemaZod = z.output<typeof UserDeleteAvatarSchema>;

export namespace IUserDeleteAvatarDTO {
  export type Params = UserDeleteAvatarSchemaZod;

  export type Result = {};
}
