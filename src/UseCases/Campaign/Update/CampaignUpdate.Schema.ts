import { $Enums } from '@prisma/client';
import { z } from 'zod';

export const CampaignUpdateSchema = z
  .object({
    id: z.string({ required_error: 'enviar id', invalid_type_error: 'enviar id como string !' }).trim(),

    origin: z
      .nativeEnum($Enums.origins, {
        errorMap: () => ({
          message: `enviar como array e os valores possíveis para origin são: ${Object.values($Enums.origins).join(', ')}`,
        }),
      })
      .array()
      .optional(),

    googleSources: z
      .nativeEnum($Enums.googleTrafficSource, {
        errorMap: () => ({
          message: `enviar como array e os valores possíveis para googleSources são: ${Object.values($Enums.googleTrafficSource).join(', ')}`,
        }),
      })
      .array()
      .optional(),

    name: z
      .string({
        required_error: 'enviar campo name',
        invalid_type_error: 'enviar campo name como string',
      })
      .trim()
      .optional(),

    domain: z
      .string({
        required_error: 'enviar campo domain',
        invalid_type_error: 'enviar campo domain como string',
      })
      .trim()
      .url()
      .optional(),

    safePage: z
      .string({
        invalid_type_error: 'enviar campo safePage como string',
      })
      .trim()
      .url()
      .optional(),

    safePageMethod: z
      .nativeEnum($Enums.safePageMethods, {
        errorMap: () => ({
          message: `os valores possíveis para safePageMethod são: ${Object.values($Enums.safePageMethods).join(', ')}`,
        }),
      })
      .optional(),

    offerPage: z
      .string({
        invalid_type_error: 'enviar campo offerPage como array de string',
      })
      .trim()
      .url()
      .array()
      .optional(),

    offerPageMethod: z
      .nativeEnum($Enums.offerPageMethods, {
        errorMap: () => ({
          message: `os valores possíveis para offerPageMethod são: ${Object.values($Enums.offerPageMethods).join(', ')}`,
        }),
      })
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

    devices: z.nativeEnum($Enums.campaignDevices, { invalid_type_error: 'enviar campo devices como array de string' }).array().optional(),

    manualReview: z
      .boolean({
        invalid_type_error: 'enviar campo manualReview como string',
      })
      .optional(),

    pageType: z
      .nativeEnum($Enums.pageTypes, {
        errorMap: () => ({
          message: `os valores possíveis para pageType são: ${Object.values($Enums.pageTypes).join(', ')}`,
        }),
      })
      .optional(),

    disclaimer: z
      .string({ required_error: 'enviar campo disclaimer', invalid_type_error: 'enviar campo disclaimer como string' })
      .trim()
      .min(80, { message: 'enviar disclaimer com pelo menos 80 caracteres' })
      .optional(),

    companyName: z
      .string({ required_error: 'enviar campo companyName', invalid_type_error: 'enviar campo companyName como string' })
      .trim()
      .optional(),

    address: z.string({ required_error: 'enviar campo address', invalid_type_error: 'enviar campo address como string' }).trim().optional(),

    vat: z.string({ required_error: 'enviar campo vat', invalid_type_error: 'enviar campo vat como string' }).trim().optional(),

    supportPhone: z
      .string({ required_error: 'enviar campo supportPhone', invalid_type_error: 'enviar campo supportPhone como string' })
      .trim()
      .optional(),

    supportEmail: z
      .string({ required_error: 'enviar campo supportEmail', invalid_type_error: 'enviar campo supportEmail como string' })
      .trim()
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
  })
  .superRefine((data, ctx) => {
    if (data.offerPageMethod === 'AB' && (!data.offerPage || data.offerPage.length < 2)) {
      ctx.addIssue({ code: 'custom', message: 'se offerPageMethod for AB enviar pelo menos 2 urls em offerPage' });
    }

    if (data.origin && data.origin.includes('GOOGLE') && (!data.googleSources || data.googleSources.length < 1)) {
      ctx.addIssue({ code: 'custom', message: 'se GOOGLE for uma origin, enviar googleSources com pelo menos 1 item' });
    }
  });
