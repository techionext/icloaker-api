import { z } from 'zod';

export const CollaboratorCreateSchema = z.object({
  name: z.string({
    required_error: 'nome não enviado !',
    invalid_type_error: 'enviar nome como string !',
  }),

  email: z.string({
    required_error: 'email não enviado !',
    invalid_type_error: 'enviar email como string !',
  }),

  phone: z
    .string({ required_error: 'Enviar o campo phone !', invalid_type_error: 'Enviar campo phone como string !' })
    .trim()
    .transform((data) => data.replace(/\D/g, ''))
    .refine((data) => data.length >= 8, { message: 'O campo phone deve ter pelo menos 8 caracteres' })
    .optional(),

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
