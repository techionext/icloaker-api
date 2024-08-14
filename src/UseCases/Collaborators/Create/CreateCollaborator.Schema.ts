import { z } from 'zod';

export const CreateCollaboratorSchema = z.object({
  name: z.string({
    required_error: 'nome não enviado !',
    invalid_type_error: 'enviar nome como string !',
  }),

  email: z.string({
    required_error: 'email não enviado !',
    invalid_type_error: 'enviar email como string !',
  }),

  phone: z.string({ required_error: 'Enviar o campo phone !', invalid_type_error: 'Enviar phone como string !' }).trim(),

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
