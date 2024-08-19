import { z } from 'zod';

export const CampaignAllowConfigSchema = z.object({
  id: z.string({ required_error: 'enviar id', invalid_type_error: 'enviar id como string !' }).trim(),

  allowIsps: z.string({ invalid_type_error: 'enviar campo allowIsps como array de string' }).trim().array().optional(),

  allowRefererOrigins: z.string({ invalid_type_error: 'enviar campo allowRefererOrigins como array de string' }).trim().array().optional(),

  allowQueries: z.string({ invalid_type_error: 'enviar campo allowQueries como array de string' }).trim().array().optional(),

  allowIps: z
    .string({ invalid_type_error: 'enviar campo allowIps como array de string' })
    .trim()
    .ip({ message: 'algum ip foi informado com formato errado, utilize ipv4 ou ipv6' })
    .array()
    .optional(),

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
