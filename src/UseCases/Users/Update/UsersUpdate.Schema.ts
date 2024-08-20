import { $Enums } from '@prisma/client';
import { z } from 'zod';

export const UsersUpdateSchema = z.object({
  id: z.string({ required_error: 'enviar id', invalid_type_error: 'enviar id como string' }).trim(),

  email: z.string({ invalid_type_error: 'enviar campo email como string | email' }).trim().email().optional(),

  phone: z
    .string({ invalid_type_error: 'enviar campo phone' })
    .trim()
    .transform((value) => value.replace(/\D/g, ''))
    .refine((value) => value.length >= 8, { message: 'O número de telefone deve ter pelo menos 8 dígitos' })
    .optional(),

  name: z.string({ invalid_type_error: 'enviar campo name como string' }).trim().optional(),

  role: z.nativeEnum($Enums.userRole).optional(),

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
