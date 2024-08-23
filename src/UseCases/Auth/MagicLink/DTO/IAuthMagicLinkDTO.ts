import { z } from 'zod';

import { AuthMagicLinkSchema } from '../AuthMagicLink.Schema';

export type AuthMagicLinkSchemaZod = z.output<typeof AuthMagicLinkSchema>;

export namespace IAuthMagicLinkDTO {
  export type Params = AuthMagicLinkSchemaZod;

  export type Result = {};
}
