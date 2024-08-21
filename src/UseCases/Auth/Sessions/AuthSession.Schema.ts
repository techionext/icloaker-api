import { z } from 'zod';

export const AuthSessionSchema = z.object({
  token: z.object(
    {
      id: z.string({
        required_error: 'id token não encontrado !',
      }),

      email: z.string({
        required_error: 'email token não encontrado !',
      }),
    },
    { required_error: 'token não enviado !' },
  ),
});
