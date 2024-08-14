import { z } from 'zod';

export const DeleteCollaboratorSchema = z.object({
  id: z.string({
    required_error: 'id nao enviado !',
    invalid_type_error: 'enviar id como string !',
  }),

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
