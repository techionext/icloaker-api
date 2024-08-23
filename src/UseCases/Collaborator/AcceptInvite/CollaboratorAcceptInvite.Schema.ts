import { z } from 'zod';

export const CollaboratorAcceptInviteSchema = z.object({
  inviteId: z.string({ required_error: 'enviar inviteId', invalid_type_error: 'enviar inviteId como string' }).trim(),

  token: z.object(
    {
      id: z.string({
        required_error: 'id token não encontrado !',
      }),

      email: z
        .string({
          required_error: 'email token não encontrado !',
        })
        .nullable(),
    },
    { required_error: 'token não enviado !' },
  ),
});
