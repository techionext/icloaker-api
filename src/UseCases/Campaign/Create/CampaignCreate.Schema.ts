import { $Enums } from '@prisma/client';
import { z } from 'zod';

import { zodUniqueValueInArray } from '@shared/features/zod/ArrayUniqueValues';

export const CampaignCreateSchema = z
  .object({
    origin: z
      .nativeEnum($Enums.origins)
      .array()
      .refine((data) => zodUniqueValueInArray(data), { message: 'Deve conter apenas valores únicos' }),

    googleSources: z
      .nativeEnum($Enums.googleTrafficSource)
      .array()
      .refine((data) => zodUniqueValueInArray(data), { message: 'Deve conter apenas valores únicos' })
      .optional(),

    name: z.string().trim(),

    domain: z.string().trim().url(),

    safePage: z.string().trim().url().optional(),

    safePageMethod: z.nativeEnum($Enums.safePageMethods),

    offerPage: z
      .string()
      .trim()
      .url()
      .array()
      .refine((data) => zodUniqueValueInArray(data), { message: 'Deve conter apenas valores únicos' }),

    offerPageMethod: z.nativeEnum($Enums.offerPageMethods),

    languages: z
      .string()
      .trim()
      .array()
      .refine((data) => zodUniqueValueInArray(data), { message: 'Deve conter apenas valores únicos' })
      .optional(),

    countries: z
      .string()
      .trim()
      .array()
      .refine((data) => zodUniqueValueInArray(data), { message: 'Deve conter apenas valores únicos' })
      .optional(),

    devices: z
      .nativeEnum($Enums.campaignDevices)
      .array()
      .refine((data) => zodUniqueValueInArray(data), { message: 'Deve conter apenas valores únicos' }),

    manualReview: z.boolean().optional(),

    pageType: z.nativeEnum($Enums.pageTypes),

    disclaimer: z.string().trim().min(80),

    companyName: z.string().trim(),

    address: z.string().trim(),

    vat: z.string().trim(),

    supportPhone: z.string().trim(),

    supportEmail: z.string().trim(),

    token: z.object({
      id: z.string(),

      email: z.string().nullable(),
    }),
  })
  .superRefine((data, error) => {
    if (data.offerPageMethod === 'AB' && data.offerPage.length < 2) {
      error.addIssue({
        code: 'custom',
        path: ['offerPageMethod'],
        message: 'Se offerPageMethod for AB enviar pelo menos 2 urls em offerPage',
      });
    }

    if (data.origin.includes('GOOGLE') && (!data.googleSources || data.googleSources.length < 1)) {
      error.addIssue({
        code: 'custom',
        path: ['googleSources'],
        message: 'Se GOOGLE for uma origin, enviar googleSources com pelo menos 1 item',
      });
    }
  });
