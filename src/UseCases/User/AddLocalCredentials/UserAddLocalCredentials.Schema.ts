import { z } from 'zod';

export const UserAddLocalCredentialsSchema = z.object({
  email: z
    .string({
      required_error: 'Enviar o campo email !',
      invalid_type_error: 'Enviar email como string !',
    })
    .trim()
    .email(),

  password: z
    .string({
      required_error: 'Enviar o campo password !',
      invalid_type_error: 'Enviar password como string !',
    })
    .trim()
    .min(1, { message: 'Senha é obrigatório' })
    .min(8, { message: 'Senha deve conter no mínimo 8 dígitos' })
    .refine((senha) => /[a-z]/.test(senha), {
      message: 'A senha deve conter pelo menos uma letra minúscula',
    })
    .refine((senha) => /[A-Z]/.test(senha), {
      message: 'A senha deve conter pelo menos uma letra maiúscula',
    })
    .refine((senha) => /\d/.test(senha), {
      message: 'A senha deve conter pelo menos um número',
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
