import { z } from 'zod';

export const UserCreatePasswordSchema = z
  .object({
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

    confirmPassword: z
      .string({
        required_error: 'Enviar o campo password !',
        invalid_type_error: 'Enviar password como string !',
      })
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
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) ctx.addIssue({ code: 'custom', message: 'As senhas não coincidem' });
  });
