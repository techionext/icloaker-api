import { z } from 'zod';

import { SchemaUserConfirmPasswordChange } from '../UserConfirmPasswordChange.Schema';

export type SchemaUserConfirmPasswordChangeZod = z.output<typeof SchemaUserConfirmPasswordChange>;

export namespace IUserConfirmPasswordChangeDTO {
  export type Params = SchemaUserConfirmPasswordChangeZod;

  export type Result = {
    isValid: boolean;
    message: string;
  };
}
