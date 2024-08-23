import { z } from 'zod';

export const AuthMagicLinkSchema = z.object({
  id: z.string({ required_error: 'enviar id' }).trim(),
});
