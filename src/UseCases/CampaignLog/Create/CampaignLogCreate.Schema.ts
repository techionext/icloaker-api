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
      invalid_type_error: 'enviar redirectTo como string !',
    })
    .trim()
    .optional(),

  pageUrl: z
    .string({
      invalid_type_error: 'enviar pageUrl como string !',
    })
    .trim()
    .optional(),

  refererPage: z
    .string({
      invalid_type_error: 'enviar refererPage como string !',
    })
    .trim()
    .optional(),

  ipInfo: z
    .object({
      ip_address: z.string().ip(),
      query_source: z.string(),

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
        country_code: z.string().length(2).nullable().default(null),
        region_code: z.string().length(2).nullable().default(null),
        continent_code: z.string().length(2).nullable().default(null),
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
        name: z.string(),
        version: z.string().nullable().default(null),
      }),

      engine: z.object({
        name: z.string(),
        version: z.string().nullable().default(null),
      }),

      os: z.object({
        name: z.string(),
        version: z.string().nullable().default(null),
        architecture: z.string().nullable().default(null),
      }),

      device: z.object({
        type: z.string(),
        brand: z.string().nullable().default(null),
        model: z.string().nullable().default(null),
      }),

      userAgent: z.string(),
    })
    .optional(),

  apiResponse: z
    .string({
      invalid_type_error: 'enviar apiResponse como string !',
    })
    .trim()
    .optional(),
});
