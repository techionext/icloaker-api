import { z } from 'zod';

const filteredUserRoles = ['USER', 'COLLABORATOR', 'ADMIN'] as const;

export const CollaboratorUpdateSchema = z.object({
  id: z.string({
    required_error: 'id nao enviado !',
    invalid_type_error: 'enviar id como string !',
  }),

  role: z.enum(filteredUserRoles, {
    errorMap: () => ({ message: `role deve ser um dos seguintes valores: ${filteredUserRoles.join(', ')}.` }),
  }),

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
