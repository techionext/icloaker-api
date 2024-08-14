import { z } from 'zod';

import { SchemaRecoverPassword } from '../SchemaRecoverPassword';

export type SchemaRecoverPasswordZod = z.output<typeof SchemaRecoverPassword>;

export namespace IRecoverPasswordDTO {
  export type Params = SchemaRecoverPasswordZod;

  export type Result = {
    isValid: boolean;
    message: string;
  };
}
