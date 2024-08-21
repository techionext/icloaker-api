import { z } from 'zod';

export const AuthLoginSchema = z.object({
  email: z.string({ required_error: 'enviar campo email', invalid_type_error: 'enviar campo email como string' }).trim().email(),

  password: z.string({ required_error: 'enviar campo password', invalid_type_error: 'enviar campo password como string' }).trim(),
});
