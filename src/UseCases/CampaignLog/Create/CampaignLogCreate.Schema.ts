import { z } from 'zod';

export const CampaignLogCreateSchema = z.object({
  campaignId: z
    .string({
      required_error: 'campaignId não enviado !',
      invalid_type_error: 'enviar campaignId como string !',
    })
    .trim(),

  ip: z
    .string({
      invalid_type_error: 'enviar ip como string !',
    })
    .trim()
    .ip()
    .optional(),

  redirectTo: z
    .string({
      invalid_type_error: 'enviar redirectTo como string !',
    })
    .trim()
    .optional(),

  page: z
    .string({
      invalid_type_error: 'enviar page como string !',
    })
    .trim()
    .optional(),

  referer: z
    .string({
      invalid_type_error: 'enviar referer como string !',
    })
    .trim()
    .optional(),

  userAgent: z
    .string({
      invalid_type_error: 'enviar userAgent como string !',
    })
    .trim()
    .optional(),

  language: z
    .string({
      invalid_type_error: 'enviar language como string !',
    })
    .trim()
    .optional(),

  ipInfo: z
    .unknown({
      invalid_type_error: 'enviar ipInfo como any !',
    })
    .optional(),

  deviceInfo: z
    .unknown({
      invalid_type_error: 'enviar deviceInfo como any !',
    })
    .optional(),

  apiResponse: z
    .string({
      invalid_type_error: 'enviar apiResponse como string !',
    })
    .trim()
    .optional(),
});
