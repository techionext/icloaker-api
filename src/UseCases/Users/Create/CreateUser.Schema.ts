import { z } from 'zod';

import { HandleIsValidEmail } from '@shared/features/handleIsValidEmail/handleIsValidEmail';

export const CreateUserSchema = z.object({
  name: z.string({
    required_error: 'Enviar o campo name !',
    invalid_type_error: 'Enviar name como string !',
  }),

  phone: z.string({ required_error: 'Enviar o campo phone !', invalid_type_error: 'Enviar phone como string !' }).trim().optional(),

  email: z
    .string({
      required_error: 'Enviar o campo email !',
      invalid_type_error: 'Enviar email como string !',
    })
    .trim()
    .superRefine((val, ctx) => {
      if (!HandleIsValidEmail(val)) {
        ctx.addIssue({
          code: 'custom',
          message: 'Formato de email invalido',
        });
      }
    }),

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
});
