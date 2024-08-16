import { z } from 'zod';

export const DomainCreateSchema = z.object({
  url: z
    .string({ required_error: 'enviar campo url', invalid_type_error: 'enviar campo url como string' })
    .url({ message: 'enviar url como uma url' })
    .trim(),

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
