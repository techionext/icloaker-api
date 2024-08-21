import { z } from 'zod';

export const UserRequestPasswordChangeSchema = z.object({
  email: z.string({ required_error: 'enviar campo email', invalid_type_error: 'enviar campo email como string' }).trim().email(),
});
