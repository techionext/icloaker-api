import { z } from 'zod';

export const UserCreateSchema = z.object({
  inviteId: z.string({ invalid_type_error: 'Enviar inviteId como string !' }).trim().optional(),

  name: z
    .string({
      required_error: 'Enviar o campo name !',
      invalid_type_error: 'Enviar name como string !',
    })
    .trim(),

  phone: z
    .string({ required_error: 'Enviar o campo phone !', invalid_type_error: 'Enviar campo phone como string !' })
    .trim()
    .transform((data) => data.replace(/\D/g, ''))
    .refine((data) => data.length >= 8, { message: 'O campo phone deve ter pelo menos 8 caracteres' })
    .optional(),

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
});
