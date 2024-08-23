import { z } from 'zod';

import { CollaboratorSendInviteSchema } from '../CollaboratorSendInvite.Schema';

export type CollaboratorSendInviteSchemaZod = z.output<typeof CollaboratorSendInviteSchema>;

export namespace ICollaboratorSendInviteDTO {
  export type Params = CollaboratorSendInviteSchemaZod;

  export type Result = {};
}
