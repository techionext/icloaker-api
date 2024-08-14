import { z } from 'zod';

export const SchemaRecoverPassword = z
  .object({
    id: z.string({
      required_error: 'id não encontrado !',
      invalid_type_error: 'Enviar id como string',
    }),

    password: z
      .string({
        required_error: 'password não encontrado',
        invalid_type_error: 'Enviar password como string',
      })
      .trim()
      .min(1, { message: 'Nova senha é obrigatório' })
      .min(8, { message: 'Nova senha deve conter no mínimo 8 dígitos' })
      .refine((senha) => /[a-z]/.test(senha), {
        message: 'A nova senha deve conter pelo menos uma letra minúscula',
      })
      .refine((senha) => /[A-Z]/.test(senha), {
        message: 'A nova senha deve conter pelo menos uma letra maiúscula',
      })
      .refine((senha) => /\d/.test(senha), {
        message: 'A nova senha deve conter pelo menos um número',
      }),

    verifyPassword: z
      .string({
        required_error: 'verifyPassword não encontrado',
        invalid_type_error: 'Enviar verifyPassword como string',
      })
      .trim(),
  })
  .superRefine(({ password, verifyPassword }, ctx) => {
    if (password !== verifyPassword) {
      ctx.addIssue({
        code: 'custom',
        message: 'As senhas enviadas não coincidem !',
      });
    }
  });
