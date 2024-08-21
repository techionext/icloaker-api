import { z } from 'zod';

export const UserUpdateAvatarSchema = z.object({
  avatar: z.object({
    location: z.string({
      required_error: 'avatar location não encontrado !',
      invalid_type_error: 'Enviar avatar location como string',
    }),

    key: z.string({
      required_error: 'avatar key não encontrado !',
      invalid_type_error: 'Enviar avatar key como string',
    }),
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
