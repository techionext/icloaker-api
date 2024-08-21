import { $Enums } from '@prisma/client';
import { z } from 'zod';

export const CampaignDenyConfigSchema = z.object({
  id: z.string({ required_error: 'enviar id', invalid_type_error: 'enviar id como string !' }).trim(),

  antiSpy: z.nativeEnum($Enums.campaignAntiSpy, { invalid_type_error: 'enviar campo antiSpy como array de string' }).array(),

  denyLanguages: z.string({ invalid_type_error: 'enviar campo denyLanguages como array de string' }).trim().array().optional(),

  denyCountries: z.string({ invalid_type_error: 'enviar campo denyCountries como array de string' }).trim().array().optional(),

  denyIps: z
    .string({ invalid_type_error: 'enviar campo denyIps como array de string' })
    .trim()
    .ip({ message: 'algum ip foi informado com formato errado, utilize ipv4 ou ipv6' })
    .array()
    .optional(),

  denyIsps: z.string({ invalid_type_error: 'enviar campo denyIsps como array de string' }).trim().array().optional(),

  denyQueries: z.string({ invalid_type_error: 'enviar campo denyQueries como array de string' }).trim().array().optional(),

  denyRefererOrigins: z.string({ invalid_type_error: 'enviar campo denyRefererOrigins como array de string' }).trim().array().optional(),

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
