import { $Enums } from '@prisma/client';
import { z } from 'zod';

export const CampaignLogCreateSchema = z.object({
  campaignId: z
    .string({
      required_error: 'campaignId não enviado !',
      invalid_type_error: 'enviar campaignId como string !',
    })
    .trim(),

  redirectTo: z
    .string({
      required_error: 'redirectTo não enviado !',
      invalid_type_error: 'enviar redirectTo como string !',
    })
    .trim()
    .optional(),

  pageUrl: z
    .string({
      required_error: 'pageUrl não enviado !',
      invalid_type_error: 'enviar pageUrl como string !',
    })
    .trim()
    .optional(),

  refererPage: z
    .string({
      required_error: 'refererPage não enviado !',
      invalid_type_error: 'enviar refererPage como string !',
    })
    .trim()
    .optional(),

  ipInfo: z
    .object({
      ip_address: z
        .string({
          required_error: 'ip_address não enviado !',
          invalid_type_error: 'enviar ip_address como string !',
        })
        .ip(),
      query_source: z.string({
        required_error: 'query_source não enviado !',
        invalid_type_error: 'enviar query_source como string !',
      }),

      location: z.object({
        city: z.string().nullable().default(null),
        region: z.string().nullable().default(null),
        country: z.string().nullable().default(null),
        continent: z.string().nullable().default(null),

        coordinates: z.object({
          latitude: z.string().nullable().default(null),
          longitude: z.string().nullable().default(null),
        }),

        time_zone: z.string().nullable().default(null),
        locale: z.string().nullable().default(null),
        country_code: z.string().min(3, { message: 'enviar country_code no padrão Alpha-3' }).toUpperCase().nullable().default(null),
        region_code: z.string().min(2, { message: 'enviar region_code com 2 caracteres' }).toUpperCase().nullable().default(null),
        continent_code: z.string().min(2).nullable().default(null),
        is_in_european_union: z.boolean(),
      }),

      network: z.object({
        hostname: z.string().nullable().default(null),
        cidr_block: z.string().nullable().default(null),
        asn: z.string().nullable().default(null),
        isp: z.string().nullable().default(null),
      }),

      bot_info: z.object({
        is_bot: z.boolean(),
        bot_name: z.string().nullable().default(null),
        detection_method: z.string().nullable().default(null),
      }),
    })
    .optional(),

  requestInfo: z
    .object({
      browser: z.object({
        name: z.string({
          required_error: 'name do browser não enviado !',
          invalid_type_error: 'enviar name do browser como string !',
        }),
        version: z.string().nullable().default(null),
      }),

      engine: z.object({
        name: z.string({
          required_error: 'name do engine não enviado !',
          invalid_type_error: 'enviar name do engine como string !',
        }),
        version: z.string().nullable().default(null),
      }),

      os: z.object({
        name: z.string({
          required_error: 'name do os não enviado !',
          invalid_type_error: 'enviar name do os como string !',
        }),
        version: z.string().nullable().default(null),
        architecture: z.string().nullable().default(null),
      }),

      device: z.object({
        type: z.nativeEnum($Enums.campaignDevices),
        brand: z.string().nullable().default(null),
        model: z.string().nullable().default(null),
      }),

      userAgent: z.string({
        invalid_type_error: 'enviar userAgent como string !',
      }),
    })
    .optional(),

  apiResponse: z
    .string({
      invalid_type_error: 'enviar apiResponse como string !',
    })
    .trim()
    .optional(),
});
