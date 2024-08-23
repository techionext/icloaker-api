import { z } from 'zod';

import { CollaboratorAcceptInviteSchema } from '../CollaboratorAcceptInvite.Schema';

export type CollaboratorAcceptInviteSchemaZod = z.output<typeof CollaboratorAcceptInviteSchema>;

export namespace ICollaboratorAcceptInviteDTO {
  export type Params = CollaboratorAcceptInviteSchemaZod;

  export type Result = {};
}
