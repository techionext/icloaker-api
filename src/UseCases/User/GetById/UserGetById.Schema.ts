import { z } from 'zod';

export const UserGetByIdSchema = z.object({
  id: z.string({ required_error: 'enviar id', invalid_type_error: 'enviar id como string' }).trim(),

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
