import { z } from 'zod';

export const CollaboratorSendInviteSchema = z.object({
  email: z.string({ required_error: 'enviar campo email', invalid_type_error: 'enviar campo email como string' }).trim().email(),

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
