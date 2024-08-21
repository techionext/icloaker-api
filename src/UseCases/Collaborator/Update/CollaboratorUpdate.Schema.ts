import { $Enums } from '@prisma/client';
import { z } from 'zod';

export const CollaboratorUpdateSchema = z.object({
  id: z.string({
    required_error: 'id nao enviado !',
    invalid_type_error: 'enviar id como string !',
  }),

  role: z
    .nativeEnum($Enums.userRole, {
      invalid_type_error: `Valor inválido para role. Opções válidas: ${Object.values($Enums.userRole).join(', ')}.`,
    })
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
