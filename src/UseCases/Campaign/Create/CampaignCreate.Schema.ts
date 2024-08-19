import { $Enums } from '@prisma/client';
import { z } from 'zod';

export const CampaignCreateSchema = z.object({
  origin: z
    .string({
      required_error: 'enviar campo origin',
      invalid_type_error: 'enviar campo origin como array de string',
    })
    .trim()
    .array(),

  name: z
    .string({
      required_error: 'enviar campo name',
      invalid_type_error: 'enviar campo name como string',
    })
    .trim(),

  domain: z
    .string({
      required_error: 'enviar campo domain',
      invalid_type_error: 'enviar campo domain como string',
    })
    .trim()
    .url(),

  safePage: z
    .string({
      invalid_type_error: 'enviar campo safePage como string',
    })
    .trim()
    .url()
    .optional(),

  offerPage: z
    .string({
      invalid_type_error: 'enviar campo offerPage como string',
    })
    .trim()
    .url()
    .optional(),

  languages: z
    .string({
      invalid_type_error: 'enviar campo languages como array de string',
    })
    .trim()
    .array()
    .optional(),

  countries: z
    .string({
      invalid_type_error: 'enviar campo countries como array de string',
    })
    .trim()
    .array()
    .optional(),

  devices: z.nativeEnum($Enums.CampaignDevices, { invalid_type_error: 'enviar campo devices como array de string' }).array(),

  manualReview: z
    .boolean({
      invalid_type_error: 'enviar campo manualReview como string',
    })
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
