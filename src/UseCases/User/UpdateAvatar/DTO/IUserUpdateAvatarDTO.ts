import { z } from 'zod';

import { UserUpdateAvatarSchema } from '../UserUpdateAvatar.Schema';

export type UserUpdateAvatarSchemaZod = z.output<typeof UserUpdateAvatarSchema>;

export namespace IUserUpdateAvatarDTO {
  export type Params = UserUpdateAvatarSchemaZod;

  export type Result = {};
}
