import { z } from 'zod';

export const DomainUpdateSchema = z.object({
  id: z.string({ required_error: 'enviar id', invalid_type_error: 'enviar id como string' }).trim(),

  url: z
    .string({ required_error: 'enviar campo url', invalid_type_error: 'enviar campo url como string' })
    .trim()
    .url({ message: 'enviar campo url como uma url' }),

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
