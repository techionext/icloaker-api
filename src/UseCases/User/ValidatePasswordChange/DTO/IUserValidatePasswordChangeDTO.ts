import { z } from 'zod';

import { SchemaUserValidatePasswordChange } from '../UserValidatePasswordChange.Schema';

export type SchemaUserValidatePasswordChangeZod = z.output<typeof SchemaUserValidatePasswordChange>;

export namespace IUserValidatePasswordChangeDTO {
  export type Params = SchemaUserValidatePasswordChangeZod;

  export type Result = {};
}
